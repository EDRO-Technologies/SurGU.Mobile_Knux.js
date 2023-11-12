import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { Protected } from "../auth/auth-protected.guard";
import { Request, UseGuards } from "@nestjs/common";
import { ChatService } from "./chat.service";

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  constructor(private chatsService: ChatService) {}

  async handleConnection(socket: Socket) {
    try {
      await this.chatsService.getUserFromSocket(socket);
    } catch (e) {
      console.log("[Websocket IO] unauthorized");
      socket.disconnect(true);
    }
  }

  @SubscribeMessage("create_chat")
  async createChat(
    @MessageBody()
    chatName: string,
    @ConnectedSocket() socket: Socket
  ) {

    const user = await this.chatsService.getUserFromSocket(socket);

    const chat = await this.chatsService.createChat(chatName, user);

    console.log({chatName, user, chat});

    return chat;
  }

  @SubscribeMessage("send_message")
  async sendMessage(
    @MessageBody()
    msgBody: {
      text: string;
      chatId: number;
    },
    @ConnectedSocket() socket: Socket
  ) {
    const user = await this.chatsService.getUserFromSocket(socket);

    const { text, chatId } = msgBody;
    console.log(`receive_message_${chatId}`, text);
    const message = await this.chatsService.addMessage(text, user, chatId);

    this.server.sockets.emit(`receive_message_${chatId}`, {
      id: message.id,
      createdAt: message.createdAt,
      text,
      user,
    });
  }

  @SubscribeMessage("invite_to_chat")
  async inviteToChat(
    @MessageBody()
    body: {chatId: string, userId: string},
    @ConnectedSocket() socket: Socket
  ) {
    const { chatId, userId } = body;
    await this.chatsService.addToChat(+chatId, +userId);

    this.server.sockets.emit(`invite`, {
      chatId, userId 
    });
  }

  @SubscribeMessage("get_all_messages")
  async getAllMessages(
    @MessageBody()
    chatId: string,
    @ConnectedSocket() socket: Socket
  ) {
    await this.chatsService.getUserFromSocket(socket);
    const messages = await this.chatsService.getAllMessagesFromChat(+chatId);

    console.log({messages, chatId});
    // this.server.sockets.emit("receive_message", messages);

    return messages;
  }
}
