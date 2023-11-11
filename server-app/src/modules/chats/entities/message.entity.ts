import { User } from "src/modules/user/entities/user.entity";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { Chat } from "./chat.entity";

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @ManyToOne(() => User, (x) => x.messages)
  user: User;

  @ManyToOne(() => Chat, (x) => x.messages)
  chat: Chat;

  @CreateDateColumn()
  createdAt: Date;
}
