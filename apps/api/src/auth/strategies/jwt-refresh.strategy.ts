import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-jwt";
import { JwtPayloadType } from "src/types/jwtpayload";
import { UsersService } from "src/users/users.service";
import { extractRefreshToken } from "src/utils/extract-refresh-token.util";
import {type Request} from "express"
import { PrismaService } from "src/prisma/prisma.service";
import bcrypt from "bcrypt"

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, "jwt-refresh"){


    constructor(
       private readonly userService:UsersService,
       private readonly configService:ConfigService,
       private prisma:PrismaService
    ){
        super({
            secretOrKey:configService.getOrThrow<string>("auth.jwtRefreshSecret"),
            jwtFromRequest:extractRefreshToken,
            ignoreExpiration:false,
            passReqToCallback:true
        })
    }

    async validate(req:Request, payload:JwtPayloadType) {
        const refreshToken = extractRefreshToken(req);

        if(!refreshToken){
            throw new UnauthorizedException('Please provide refresh token');
        }

        const user = await this.prisma.user.findFirst({where:{email:payload.email}});
        if(!user || !user.hashedRefreshToken){
            throw new UnauthorizedException("Access denied")
        }

        const isMatch = await bcrypt.compare(refreshToken, user.hashedRefreshToken);
        if (!isMatch) {
        throw new UnauthorizedException('Invalid refresh token');
        }

        return{
            id:payload.sub,
            email:payload.email,
            role:payload.role,
            refreshToken
        };
    }
}
