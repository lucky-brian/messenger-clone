import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Group } from 'src/group/group.entity';
import { GroupModule } from 'src/group/group.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Group]),GroupModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
