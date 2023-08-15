import { Request, Controller, Post, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local/local-auth.guards';
import { JwtAuthGuard } from './jwt/jwt.auth.guards';
import { User } from 'src/users/users.entity';
import { singUpTypeReturn } from 'src/users/dto/signUpResult.dto';
import { UsersService } from 'src/users/users.service';
import { signUpDto } from 'src/users/dto/singUp.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private userService: UsersService
    ) { }

    @UseGuards(LocalAuthGuard)
    @Post('signin')
    signIn(@Request() req: any): Promise<any> {
        return this.authService.signIn(req.user)
    }

    @Post('signup')
    signUp(@Body() signUpDto: signUpDto): Promise<User | singUpTypeReturn> {
        return this.userService.singUp(signUpDto)
    }

}
