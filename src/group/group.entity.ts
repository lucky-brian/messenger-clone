import { Message } from 'src/message/messages.entity';
import { User } from 'src/users/users.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';

@Entity()
export class Group {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  image: string;

  @Column({ default: true })
  isGroup: boolean

  @ManyToMany(() => User)
  @JoinTable()
  members: User[];

  @Column({ default: () => 'NOW()' })
  createdAt: Date;

  @OneToMany(() => Message, (message) => message.group) // Add this line
  messages: Message[];
}