import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { Message } from "./message.entity";
import { User } from "src/modules/user/entities/user.entity";

@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => User, (x) => x.chats)
  creator: User;

  @OneToMany(() => Message, (x) => x.chat)
  messages: Message[];

  @CreateDateColumn()
  createdAt: Date;
}
