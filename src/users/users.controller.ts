import { Body, Controller, Get, Post, UseGuards, Param, Put, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { signUpDto } from './dto/singUp.dto';
import { User } from './users.entity';
import { singUpTypeReturn } from './dto/signUpResult.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.auth.guards';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) { }

    @UseGuards(JwtAuthGuard)
    @Get('all')
    allUsers(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Get('findone/:id')
    findOne(@Param('id') id: string) {
        return this.userService.findOneById(id)
    }

    @Get('finduserorgroup/:id')
    findOneUserOrGroup(@Param('id') id: string) {
        return this.userService.findOneUserOrGroup(id)
    };

    @Get()
    async getUsersWithLatestMessage() {
        return this.userService.getUsersWithLatestMessage();
    }

    @UseGuards(JwtAuthGuard)
    @Put('update-username')
    async updateUsernaem(@Body('username') username, @Request() req: any) {
        return this.userService.updateUserUsername(req.user.userId, username)
    }

};
