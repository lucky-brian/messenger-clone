import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './messages.entity';
import { GroupService } from 'src/group/group.service';
import { UsersService } from 'src/users/users.service';
import { Group } from 'src/group/group.entity';
import { SocketGateway } from 'src/socket/socket.gateway';

@Injectable()
export class MessagesService {
    constructor(
        @InjectRepository(Message)
        private readonly messageRepository: Repository<Message>,
        @InjectRepository(Group)
        private readonly groupRepository: Repository<Group>,

        private readonly groupService: GroupService,
        private readonly socketGateway: SocketGateway,
        private readonly userService: UsersService,

    ) { }

    async sendMessage(receiverId: string, body: any, user: any, isGroup: boolean): Promise<Message> {

        const _sender = await this.userService.findOneById(user.userId)

        if (isGroup) {
            // Send message to a group
            const group = await this.groupService.findGroupById(receiverId);
            if (!group) {
                throw new NotFoundException('Group not found');
            }

            const saveMessage = await this.messageRepository.save({
                body,
                sender: { id: user.userId },
                group: { id: receiverId }
            });

            const  {...result} = saveMessage

            const MsgtoSocket = {
                ...result,
                sender: _sender,
                group: group,
            }

            this.socketGateway.handleNewMessage(null, MsgtoSocket);
            return saveMessage;

        } else {
            const saveMessage = await this.messageRepository.save({
                body,
                sender: { id: user.userId },
                receiver: { id: receiverId },
            });
            console.log(saveMessage)

            const _receiver = await this.userService.findOneById(receiverId)
            const { sender, receiver, ...result } = saveMessage

            const MsgtoSocket = {
                ...result,
                sender: _sender,
                receiver: _receiver,
            }

            this.socketGateway.handleNewMessage(null, MsgtoSocket);
            return saveMessage;
        }
    }

    async getMessagesByUserIds(senderId: string, receiverId: string): Promise<Message[]> {
        return this.messageRepository
            .createQueryBuilder('message')
            .leftJoinAndSelect('message.sender', 'sender')
            .leftJoinAndSelect('message.receiver', 'receiver')
            .leftJoinAndSelect('message.group', 'group')
            .where('(message.senderId = :senderId AND message.receiverId = :receiverId) OR (message.senderId = :receiverId AND message.receiverId = :senderId)', { senderId, receiverId })
            .orderBy('message.createdAt', 'DESC')
            .getMany();
    }

    async getGroupChat(id: string): Promise<Message[]> {
        return this.messageRepository
            .createQueryBuilder('message')
            .leftJoinAndSelect('message.sender', 'sender')
            .leftJoinAndSelect('message.group', 'group')
            .where('message.groupId = :id', { id })
            .orderBy('message.createdAt', 'DESC')
            .getMany();
    }

    async deleteMessage(senderId: string, receiverId: string): Promise<any> {
        const group = await this.groupRepository.findOneBy({ id: receiverId })

        if (group) {
            const messages = await this.messageRepository.find({
                where: {
                    group: group
                }
            });

            return await this.messageRepository.remove(messages);
        }

        const message = await this.getMessagesByUserIds(senderId, receiverId)

        if (!message) {
            return { message: `can't remove message` };
        }

        return await this.messageRepository.remove(message);
    }

}