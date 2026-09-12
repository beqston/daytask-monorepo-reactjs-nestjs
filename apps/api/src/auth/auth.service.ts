import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayloadType } from 'src/types/jwtpayload';
import { ConfigService } from '@nestjs/config';
import bcrypt from "bcrypt"

@Injectable()
export class AuthService {

  constructor(
    private jwtService:JwtService,
    private configService:ConfigService
  ){}

  async login(user:JwtPayloadType) {
    const payload = {sub:user.sub, email:user.email, role:user.role}

    const accessExpiresIn = this.configService.getOrThrow<string>("auth.jwtAccessExpiresIn");
    const accessSecret = this.configService.getOrThrow<string>("auth.jwtAccessSecret");

    const token = await this.jwtService.signAsync(payload, {
      expiresIn:accessExpiresIn as any,
      secret:accessSecret
    });

    const refreshSecret = this.configService.get<string>("auth.jwtRefreshSecret")
    const refreshExpiresIn = this.configService.get<string>("auth.jwtRefreshExpires")

    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn:refreshExpiresIn as any,
      secret:refreshSecret
    })

    const hashedRefreshToken = await bcrypt.hash(token, 10)
    return{
      email:user.email,
      role:user.role,
      token,
      hashedRefreshToken
    };
  }

  validateUser() {
    return `validation user`;
  }

  refreshToken(){
    return "refresh token"
  }
 
}
