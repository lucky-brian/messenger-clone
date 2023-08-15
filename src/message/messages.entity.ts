import { Group } from 'src/group/group.entity';
import { User } from 'src/users/users.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, ManyToOne, JoinTable, JoinColumn } from 'typeorm';


@Entity()
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  body: string;

  @Column({ nullable: true }) 
  image: string;

  @Column({ default: () => 'NOW()' })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.sentMessages)
  @JoinColumn({ name: 'senderId' })
  sender: User;

  @ManyToOne(() => User, (user) => user.receivedMessages)
  @JoinColumn({ name: 'receiverId' })
  receiver: User;

  @ManyToOne(() => Group, (group) => group.messages) // Add this line
  @JoinColumn({ name: 'groupId' }) // Add this line
  group: Group; // Add this line
}