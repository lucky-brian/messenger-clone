import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ) { }

    async validateUser(email: string, password: string): Promise<any> {
        try {
            const user = await this.userService.findOne(email);

            if (user && await bcrypt.compare(password, user.password)) {
                const { password, ...result } = user
                return result
            }

            return null
        } catch (error) {
            return error
        }
    }

    async signIn(user: any) {
        try {
            const payload = { email: user.email, sub: user.id, username: user.username }
            return {
                ...user,
                accessToken: await this.jwtService.signAsync(payload),
                refreshToken: await this.jwtService.signAsync(payload, { expiresIn: '7d' })
            }
        } catch (error) {
            throw error
        }
    }
}
