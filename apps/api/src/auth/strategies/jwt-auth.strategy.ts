import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import {type Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayloadType } from "src/types/jwtpayload";

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy,"jwt"){
    constructor(
        private configService:ConfigService
    ){
        super({
            jwtFromRequest:ExtractJwt.fromExtractors([
                (req:Request)=> req.cookies?.access_token || null,
                ExtractJwt.fromAuthHeaderAsBearerToken()

            ]),
            secretOrKey:configService.getOrThrow<string>("auth.jwtAccessSecret"),
            ignoreExpiration:false
        })
    }
    
    async validate(payload:JwtPayloadType) {
        return{
            id:payload.sub,
            email:payload.email,
            role:payload.role
        }
    }
}