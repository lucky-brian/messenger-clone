import { Controller, Request, Body, Post, UseGuards, Get, Delete, Param } from '@nestjs/common';
import { GroupService } from './group.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.auth.guards';

@Controller('group')
export class GroupController {
    constructor(
        private readonly groupService: GroupService
    ) { }

    @UseGuards(JwtAuthGuard)
    @Post('create')
    async createGroup(@Body() body: { name: string; memberIds: string[] }, @Request() req: any) {
        const { name, memberIds } = body;
        const userId = req.user.userId;
        return this.groupService.createGroup(name, memberIds, userId);
    }

    @UseGuards(JwtAuthGuard)
    @Get('usersandgroup')
    async getGroups(@Request() req: any) {
        return this.groupService.findALL(req.user.userId);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('deletegroup/:groupid')
    async deleteGroup(@Param('groupid') groupid: string) {
        return this.groupService.deleteGroup(groupid)
    }

    @UseGuards(JwtAuthGuard)
    @Get(':groupid')
    async getGroupAndMembers(@Param('groupid') groupid: string) {
        return this.groupService.getGroupAndMembers(groupid);
    }

    @UseGuards(JwtAuthGuard)
    @Post('update/:groupid')
    async updateGroup(@Param('groupid') groupid: string, @Body('name') newGroupName: string, @Body('image') newImage: string) {
        return this.groupService.updateGroup(groupid, newGroupName, newImage)
    }

}
