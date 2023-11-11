import { Controller, Param, Post, Req, UseGuards } from "@nestjs/common";
import { ChatService } from "./chat.service";
import { UserService } from "../user/user.service";
import { Protected } from "../auth/auth-protected.guard";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("chat")
@Controller("chats")
export class ChatController {
  constructor(private chatsService: ChatService) {}

  @Post("create/:name")
  @UseGuards(Protected)
  async createChat(@Req() req, @Param('name') name: string) {
    console.log(req.user, name);

    const user = req.user;

    const chat = await this.chatsService.createChat(name, user);

    console.log({name, user, chat});

    return chat.id;
  }
}
