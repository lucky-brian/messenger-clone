import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from './group.entity';
import { Message } from 'src/message/messages.entity';
import { User } from 'src/users/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Group, User, Message])],
  providers: [GroupService],
  exports: [
    GroupService
  ]
})
export class GroupModule {}
