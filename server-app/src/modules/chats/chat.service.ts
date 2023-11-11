import { Inject, Injectable } from "@nestjs/common";
import { AuthService } from "../auth/auth.service";
import { WsException } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { InjectRepository } from "@nestjs/typeorm";
import { Message } from "./entities/message.entity";
import { Repository } from "typeorm";
import { User } from "../user/entities/user.entity";
import { Chat } from "./entities/chat.entity";

@Injectable()
export class ChatService {
  constructor(
    private authService: AuthService,

    @InjectRepository(Message)
    private messageRep: Repository<Message>,

    @InjectRepository(Chat)
    private chatRep: Repository<Chat>
  ) {}

  async getUserFromSocket(socket: Socket) {
    let auth_token = socket.handshake.headers.authorization;

    if (!auth_token) {
      throw new WsException("Unauthorized");
    }
    // get the token itself without "Bearer"
    auth_token = auth_token.split(" ")[1];

    const user = await this.authService.getUserFromToken(auth_token);

    if (user === null) {
      throw new WsException("Invalid credentials.");
    }

    return user;
  }

  async createChat(name: string, user: User): Promise<Chat> {
    return this.messageRep.save(this.chatRep.create({ name, creator: user }));
  }

  async addMessage(
    message: string,
    user: User,
    chatId: number
  ): Promise<Message> {
    return this.messageRep.save(
      this.messageRep.create({ text: message, user, chat: { id: chatId } })
    );
  }

  async getAllMessagesFromChat(chatId: number): Promise<Message[]> {
    return await this.messageRep.find({ where: { id: chatId } });
  }
}
