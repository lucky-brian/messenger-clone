import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/users.entity';
import { MessageModule } from './message/message.module';
import { Message } from './message/messages.entity';
import { GroupController } from './group/group.controller';
import { GroupModule } from './group/group.module';
import { Group } from './group/group.entity';
import { SocketModule } from './socket/socket.module';
import { SocketGateway } from './socket/socket.gateway';


@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'messenger',
    entities: [User, Message, Group],
    synchronize: true,
  }), AuthModule,
    UsersModule,
    MessageModule,
    GroupModule,
    SocketModule,],
  controllers: [AppController, GroupController],
  providers: [AppService, SocketGateway],
})
export class AppModule {
  constructor(private dataSource: DataSource) { }
}