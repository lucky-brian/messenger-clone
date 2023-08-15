import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { signUpDto } from './dto/singUp.dto';
import * as bcrypt from 'bcrypt'
import { Group } from 'src/group/group.entity';
import { GroupService } from 'src/group/group.service';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Group)
        private groupRepository: Repository<Group>,
        
        private groupService: GroupService
    ) { }

    async singUp(signUpDto: signUpDto): Promise<User | { user: User, message: string }> {
        try {
            const { username, email, password } = signUpDto;
            const valiEmail = await this.findOne(email);

            if (valiEmail) {
                return { user: null, message: 'email has already been used !' }
            } else {
                const hashPassword = await bcrypt.hashSync(password, 10);
                const user = await this.userRepository.create({
                    email,
                    username,
                    password: hashPassword
                });

                await this.userRepository.save(user);
                return { user: user, message: 'User created successfully!' };
            }
        } catch (error) {
            throw error
        }
    }

    async findOne(email: string): Promise<User | undefined> {
        try {
            return await this.userRepository.findOneBy({ email })
        } catch (error) {
            throw error
        }
    }

    async findOneById(id: string): Promise<User | undefined> {
        try {
            return await this.userRepository.findOneBy({ id })
        } catch (error) {
            throw error
        }
    }

    async findAll(): Promise<User[]> {
        try {
            return await this.userRepository.find();
        } catch (error) {
            throw error
        }
    }

    async getUsersWithLatestMessage() {
        return this.userRepository
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.sentMessages', 'sentMessages')
            .leftJoinAndSelect('user.receivedMessages', 'receivedMessages')
            .leftJoinAndSelect('user.groups', 'groups')
            .orderBy('COALESCE(sentMessages.createdAt, receivedMessages.createdAt)', 'DESC')
            .getMany();
    }

    async updateUserUsername(id: string, newUsername: string): Promise<User> {
        const user = await this.userRepository.findOneById(id);

        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }

        user.username = newUsername;
        return this.userRepository.save(user);
    }

    async findOneUserOrGroup(id: string) {
        const user = await this.userRepository.findOneBy({id});

        if (!user) {
            const group = await this.groupRepository.findOneBy({id});
            return group;
        }
        

        return user;
    }

}
