import { Controller, Param, Post, Req, UseGuards, Get } from "@nestjs/common";
import { ChatService } from "./chat.service";
import { UserService } from "../user/user.service";
import { Protected } from "../auth/auth-protected.guard";
import { ApiTags } from "@nestjs/swagger";
import { User } from "../user/entities/user.entity";

@ApiTags("chat")
@Controller("chats")
export class ChatController {
  constructor(private chatsService: ChatService) {}

  @UseGuards(Protected)
  @Get("/allUserChatsPrivate") 
  async getAllUserChatsPrivate(@Req() req) {
    const user = req.user;

    return await this.chatsService.getAllUserChatsPrivate(user.id);
  }

  @UseGuards(Protected)
  @Get("/allUserChats") 
  async getAllUserChats(@Req() req) {
    const user = req.user;

    console.log('sdasdasd', );

    const res = await this.chatsService.getAllUserChats(user.id); 

    return res.filter(x => {
      console.log('sdasdasd', x.users.filter(x => x.id === user.id));
      return x.users.filter(x => x.id === user.id).length !== 0;
    });
  }

  @UseGuards(Protected)
  @Post("create/:name")
  async createChat(@Req() req, @Param('name') name: string) {
    const user = req.user;

    const chat = await this.chatsService.createChat(name, user);

    return chat.id;
  }

  @UseGuards(Protected)
  @Post("createPrivate/:userId")
  async createChatPrivate(@Req() req, @Param('userId') userId: string) {
    const user = req.user;

    const chat = await this.chatsService.createChatPrivate(`${user.firstName} - ${userId}`, user, +userId);

    return chat.id;
  }

  @UseGuards(Protected)
  @Get(":chatId")
  async getAllMessages(@Param('chatId') chatId: string) {
    return await this.chatsService.getAllMessagesFromChat(+chatId);
  }



}
