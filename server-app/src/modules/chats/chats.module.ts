import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from '../auth/auth.module';
import { Chat } from './entities/chat.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Message, Chat]), AuthModule],
  controllers: [ChatController],
  providers: [ChatService, ChatGateway]
})
export class ChatModule {}
