import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './local/local.strategy';
import { JwtStrategy } from './jwt/jwt.strategy';
import { JwtAuthGuard } from './jwt/jwt.auth.guards';


@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      global: true,
      secret: `${process.env.JwtSecret}`,
      signOptions: { expiresIn: '7d' },
    })
  ],
  providers: [
    AuthService, 
    LocalStrategy, 
    JwtStrategy, 
    JwtAuthGuard,
  ],
  controllers: [AuthController],
})

export class AuthModule { }