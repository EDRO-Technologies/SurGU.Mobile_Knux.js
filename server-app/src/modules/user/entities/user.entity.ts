import { Chat } from 'src/modules/chats/entities/chat.entity';
import { Message } from 'src/modules/chats/entities/message.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  ManyToMany
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  picture: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  authMethod: string;

  @CreateDateColumn()
  createdAt: Date;
  
  @OneToMany(() => Chat, chat => chat.creator)
  creators: Chat[];

  @OneToMany(() => Message, message => message.user)
  messages: Message[];

  @ManyToMany(() => Chat, chat => chat.users)
  chats: Chat[];

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}
