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

    console.log({chatName, user});

    const chat = await this.chatsService.createChat(chatName, user);
    
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
    await this.chatsService.addMessage(text, user, chatId);

    this.server.sockets.emit("receive_message", {
      text,
      user,
    });
  }

  @SubscribeMessage("get_all_messages")
  async getAllMessages(
    @MessageBody()
    chatId: number,
    @ConnectedSocket() socket: Socket
  ) {
    await this.chatsService.getUserFromSocket(socket);
    const messages = await this.chatsService.getAllMessagesFromChat(chatId);

    this.server.sockets.emit("receive_message", messages);

    return messages;
  }
}
