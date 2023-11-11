import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { UserModule } from "./user/user.module";
import { User } from "./user/entities/user.entity";
import { AuthModule } from "./auth/auth.module";
import { PassportModule } from "@nestjs/passport";
import { GoogleStrategy } from "./auth/strategies/google.strategy";
import { JwtModule, JwtModuleOptions } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ChatModule } from "./chats/chats.module";
import { Message } from "./chats/entities/message.entity";
import { Chat } from "./chats/entities/chat.entity";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => {
        return {
          type: "postgres",
          host: configService.get<string>('DATABASE_HOST'),
          port: configService.get<number>('DATABASE_PORT'),
          username: configService.get<string>('DATABASE_USERNAME'),
          password: configService.get<string>('DATABASE_PASSWORD'),
          database: configService.get<string>('DATABASE_NAME'),
          synchronize: true,
          logging: true,
          entities: [User, Message, Chat],
          subscribers: [],
          migrations: [],
        } as TypeOrmModuleOptions;
      }
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): JwtModuleOptions => {
        return {
          secret: configService.get<string>('AUTH_JWT_SECRET'),
          signOptions: { expiresIn: "AUTH_JWT_TOKEN_EXPIRES_IN" },
        } as JwtModuleOptions;
      }
    }),
    PassportModule,
    ConfigModule.forRoot(),
    UserModule,
    AuthModule,
    ChatModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
