import { Controller, Param, Post } from '@nestjs/common';
import { ChatService } from './chat.service';
import { UserService } from '../user/user.service';

@Controller('chats')
export class ChatController {}
