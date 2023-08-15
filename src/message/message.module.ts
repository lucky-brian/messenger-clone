import { Module } from '@nestjs/common';
import { MessagesController } from './message.controller';
import { MessagesService } from './message.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './messages.entity';
import { UsersModule } from 'src/users/users.module';
import { GroupModule } from 'src/group/group.module';
import { Group } from 'src/group/group.entity';
import { SocketModule } from 'src/socket/socket.module';
import { SocketGateway } from 'src/socket/socket.gateway';

@Module({
  imports: [
    TypeOrmModule.forFeature([Message,Group]),
    UsersModule,
    GroupModule,
    SocketModule,
    UsersModule
  ],
  controllers: [MessagesController],
  providers: [MessagesService, SocketGateway]
})
export class MessageModule { }
