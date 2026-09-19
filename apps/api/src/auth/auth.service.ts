import { BadRequestException, Injectable, NotAcceptableException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayloadType } from 'src/types/jwtpayload';
import { ConfigService } from '@nestjs/config';
import bcrypt from "bcrypt"
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {

  constructor(
    private jwtService:JwtService,
    private configService:ConfigService,
    private prisma:PrismaService
  ){}

  async login(user:Omit<User, "password">) {
    // create payload
    const payload = {sub:user.id, email:user.email, role:user.role}

    // create access token
    const accessExpiresIn = this.configService.getOrThrow<string>("auth.jwtAccessExpiresIn");
    const accessSecret = this.configService.getOrThrow<string>("auth.jwtAccessSecret");
    const token = await this.jwtService.signAsync(payload, {
      expiresIn:accessExpiresIn as any,
      secret:accessSecret
    });

    // create refresh token
    const refreshSecret = this.configService.get<string>("auth.jwtRefreshSecret")
    const refreshExpiresIn = this.configService.get<string>("auth.jwtRefreshExpires")
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn:refreshExpiresIn as any,
      secret:refreshSecret
    });
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);

    return{
      email:user.email,
      role:user.role,
      token,
      hashedRefreshToken
    };
  }

  async validateUser(email:string, password:string) {
    if(!email || !password) throw new BadRequestException("Please provide email and password");
    
    const user = await this.prisma.user.findUnique({where:{email}});
    if(!user) throw new BadRequestException("Invalid credentials");

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid) throw new NotAcceptableException("Invalid credentials");

    const {password:_, ...result} = user;
    return result;
  }

  refreshToken(){
    return "refresh token"
  }
 
}
