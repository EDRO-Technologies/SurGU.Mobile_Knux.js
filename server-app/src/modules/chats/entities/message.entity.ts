import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { User } from "src/modules/user/entities/user.entity";
import { Chat } from "./chat.entity";

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @ManyToOne(() => User, (user) => user.messages)//
  user: User;

  @ManyToOne(() => Chat, (chat) => chat.messages)//
  chat: Chat;

  @CreateDateColumn()
  createdAt: Date;
}
