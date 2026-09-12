import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import {type Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayloadType } from "src/types/jwtpayload";

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy,"jwt"){
    constructor(){
        super({
            jwtFromRequest:ExtractJwt.fromExtractors([
                (req:Request)=> req.cookies?.access_token || null,
                ExtractJwt.fromAuthHeaderAsBearerToken()

            ]),
            secretOrKey:"ss",
            ignoreExpiration:false
            
        })
    }
    
    async validate(payload:JwtPayloadType) {
        return true
    }
}