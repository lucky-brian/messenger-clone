import { Body, Controller, Param, Post, UseGuards, Request, Get, Delete } from '@nestjs/common';
import { MessagesService } from './message.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.auth.guards';
import { UsersService } from 'src/users/users.service';
import { GroupService } from 'src/group/group.service';
import { SocketGateway } from 'src/socket/socket.gateway';

@Controller('messages')
export class MessagesController {
  constructor(
    private readonly messageService: MessagesService,
    private readonly userService: UsersService,
    private readonly groupService: GroupService,
    private readonly socketGateway: SocketGateway,
  ) { }

  @UseGuards(JwtAuthGuard)
  @Post('send/:receiverId')
  async sendMessage(
    @Param('receiverId') receiverId: string,
    @Body('body') body: string,
    @Body('isGroup') isGroup: boolean,
    @Request() req: any,
  ) {
    if (isGroup) {
      const message = await this.messageService.sendMessage(
        receiverId,
        body,
        req.user,
        true,
      );

      // ส่งข้อความแบบ real-time ไปยังกลุ่ม
      this.socketGateway.server.to(receiverId).emit('newMessage', message);

      return message;
    } else {
      const message = await this.messageService.sendMessage(
        receiverId,
        body,
        req.user,
        false,
      );

      // ส่งข้อความแบบ real-time ไปยังผู้รับ
      this.socketGateway.server.to(receiverId).emit('newMessage', message);

      return message;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('getcontact')
  async getUsersAndGroups(@Request() req: any) {
    const allUsers = await this.userService.findAll();
    const allGroups = await this.groupService.findALL(req.user.userId);

    return {
      users: allUsers,
      groups: allGroups
    }
  };

  @UseGuards(JwtAuthGuard)
  @Get('chat/:receiverId')
  async getChat(@Param('receiverId') receiverId: string, @Request() req: any) {
    return this.messageService.getMessagesByUserIds(req.user.userId, receiverId)
  }

  @UseGuards(JwtAuthGuard)
  @Get('group/:groupId')
  async getGroupChat(@Param('groupId') groupId: string, @Request() req: any) {
    return this.messageService.getGroupChat(groupId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('chat/:receiverId')
  async deleteChat(@Param('receiverId') receiverId: string, @Request() req: any) {
    return this.messageService.deleteMessage(req.user.userId, receiverId)
  };


};