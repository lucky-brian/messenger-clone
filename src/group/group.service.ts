import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Group } from './group.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from 'src/message/messages.entity';
import { User } from 'src/users/users.entity';

@Injectable()
export class GroupService {
    constructor(
        @InjectRepository(Group)
        private groupRepository: Repository<Group>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Message)
        private messageRepository: Repository<Message>
    ) { }

    async createGroup(name: string, memberIds: string[], creatorId: string): Promise<Group> {
        const group = this.groupRepository.create({
            name,
            members: [
                { id: creatorId },
                ...memberIds.map((id) => ({ id }))
            ]
        });
        return this.groupRepository.save(group)
    };

    async findGroupById(id: string) {
        return await this.groupRepository.findOneBy({ id })
    }

    async findALL(userId: string): Promise<any[]> {
        const groups = await this.groupRepository.createQueryBuilder('group')
            .leftJoinAndSelect('group.members', 'members')
            .leftJoinAndSelect('group.messages', 'messages')
            .where('members.id = :userId', { userId })
            .orderBy('messages.createdAt', 'DESC')
            .getMany();

        const users = await this.userRepository.find();

        const combinedData = [
            ...groups.map(group => ({ ...group, isGroup: true })),
            ...users.map(user => ({ ...user, isGroup: false })),
        ];

        return combinedData;
    }


    async deleteGroup(id: string): Promise<{ message: string }> {
        const group = await this.findGroupById(id);

        if (!group) {
            throw new NotFoundException(`Group with ID ${id} not found`);
        }

        // ลบข้อมูลของกลุ่มที่เกี่ยวข้องในตาราง Message ก่อน
        const messages = await this.messageRepository.find({
            where: {
                group: group
            }
        });

        if (messages.length > 0) {
            await this.messageRepository.remove(messages);
        }

        // ลบกลุ่ม
        await this.groupRepository.remove(group);

        return { message: 'success' }
    }

    async getGroupAndMembers(id: string) {
        return await this.groupRepository.createQueryBuilder('group')
            .leftJoinAndSelect('group.members', 'members')
            .where('group.id = :id', { id })
            .getOne()
    }

    async updateGroup(id: string, newGroupName: string, newImage: string) {
        const group = await this.findGroupById(id);

        if (!group) {
            throw new NotFoundException(`Group with ID ${id} not found`);
        }

        if (newGroupName === '' || newGroupName === undefined) {
            throw new NotFoundException('Group name is required');
        }

        if (newImage !== undefined && newImage !== '') {
            group.image = newImage;
        }

        group.name = newGroupName;
        await this.groupRepository.save(group);

        return { message: 'Update successful' };
    }
};
