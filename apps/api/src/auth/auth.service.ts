import { BadRequestException, Injectable, NotAcceptableException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayloadType } from 'src/types/jwtpayload';
import { ConfigService } from '@nestjs/config';
import bcrypt from "bcrypt"
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import { type Response } from 'express';

@Injectable()
export class AuthService {

  constructor(
    private jwtService:JwtService,
    private configService:ConfigService,
    private prisma:PrismaService
  ){}

  async generateTokens(payload:JwtPayloadType){
    const [acsessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret:this.configService.getOrThrow<string>("auth.jwtAccessSecret"),
        expiresIn:this.configService.getOrThrow<string>("auth.jwtAccessExpiresIn") as any
      }),

      this.jwtService.signAsync(payload, {
        secret:this.configService.getOrThrow<string>("auth.jwtRefreshSecret"),
        expiresIn:this.configService.getOrThrow<string>("auth.jwtRefreshExpires") as any
      })
    ]);

    return{
      acsessToken,
      refreshToken
    }
  }
  

  async login(user:Omit<User, "password">, res:Response) {
    // create payload
    const payload = {sub:user.id, email:user.email, role:user.role}

    // generate access and refresh tokens
    const{acsessToken, refreshToken}=await this.generateTokens(payload);

    // hashed refresh token
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);

    res.cookie('access_token', acsessToken, {
      secure:true,
      httpOnly:true,
      sameSite:"lax",
      maxAge:15 * 60 * 1000
    });

    res.cookie("refresh_token", refreshToken, {
      secure:true,
      httpOnly:true,
      sameSite:"lax",
      maxAge:7 * 24 * 60 * 60 * 1000
    });

    return{
      email:user.email,
      role:user.role,
      acsessToken,
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

  async refreshToken(user:Pick<User, "id"|"email" | "role">, res: Response){

    const payload = {sub:user.id, email:user.email, role:user.role}
    const {refreshToken:newRefreshToken, acsessToken} = await this.generateTokens(payload);

    const hasedRefreshToken = await bcrypt.hash(newRefreshToken, 10);

    await this.prisma.user.update({where:{id:user.id}, data:{hashedRefreshToken:hasedRefreshToken}});


    res.cookie("access_token", acsessToken, {
      secure:process.env.NODE_ENV === 'production',
      sameSite:"lax",
      httpOnly:true,
      maxAge: 15 * 60 * 1000
    });

    res.cookie("refresh_token", newRefreshToken, {
      secure:process.env.NODE_ENV === 'production',
      sameSite:"lax",
      httpOnly:true,
      maxAge: 7 * 24 * 60 * 60* 1000
    });

    return { message: "Tokens refreshed successfully" };
  }
 
}
