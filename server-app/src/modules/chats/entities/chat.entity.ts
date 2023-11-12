import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Message } from "./message.entity";
import { User } from "src/modules/user/entities/user.entity";


@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({nullable: true})
  isPrivate: boolean;
  
  @ManyToOne(() => User, (user) => user.creators)//
  creator: User;

  @OneToMany(() => Message, (message) => message.chat)//
  messages: Message[];

  @ManyToMany(() => User, (user) => user.chats)
  @JoinTable()
  users: User[];

  @CreateDateColumn()
  createdAt: Date;
}
