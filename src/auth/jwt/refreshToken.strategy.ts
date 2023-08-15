import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt } from "passport-jwt";
import { Strategy } from "passport-jwt";

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromBodyField('refresh'),
            ignoreExpiration: false,
            secretOrKey: `${process.env.JwtSecret}`,
        })
    }

    async validate(payload: any) {
        return { userId: payload.sub, email: payload.email };
    };
};