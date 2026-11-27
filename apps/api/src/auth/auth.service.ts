import { BadRequestException, Injectable, NotAcceptableException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayloadType } from 'src/types/jwtpayload';
import { ConfigService } from '@nestjs/config';
import bcrypt from "bcrypt"
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import { OAuth2Client } from 'google-auth-library';
interface GoogleUserInfo {
  sub: string;
  email: string;
  email_verified?: boolean;
  name?: string;
  picture?: string;
}
@Injectable()
export class AuthService {
  private readonly googleClient: OAuth2Client;
  constructor(
    private jwtService:JwtService,
    private configService:ConfigService,
    private prisma:PrismaService
  ){
    this.googleClient = new OAuth2Client(
      this.configService.get<string>(
        "auth.googleClientSecret"
      )
    )
  }

  async generateTokens(payload:JwtPayloadType){
    const [acsessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret:this.configService.getOrThrow<string>("auth.jwtAccessSecret"),
        expiresIn:this.configService.getOrThrow<string>("auth.jwtAccessExpiresIn") as any
      }),

      this.jwtService.signAsync(payload, {
        secret:this.configService.getOrThrow<string>("auth.jwtRefreshSecret"),
        expiresIn:this.configService.getOrThrow<string>("auth.jwtRefreshExpiresIn") as any
      })
    ]);

    return{
      acsessToken,
      refreshToken
    }
  }
  
  async login(user:Pick<User, 'id' | 'email' | 'role' | 'fullName' | 'imageUrl'>) {
    // create payload
    const payload = {sub:user.id, email:user.email, role:user.role}
    // generate access and refresh tokens
    const{acsessToken, refreshToken}=await this.generateTokens(payload);

    // hashed refresh token
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    // save hashed refresh token in database
    await this.prisma.user.update({
      where: { id: user.id },
      data: { isActive:true, hashedRefreshToken },
    });
    return{
      user:{
        id:user.id,
        email:user.email,
        role:user.role,
        fullName:user.fullName,
        imageUrl:user.imageUrl
      },
      acsessToken,
      refreshToken
    };
  }

  async validateUser(email:string, password:string) {
    if(!email || !password) throw new BadRequestException("Please provide email and password");
    
    const user = await this.prisma.user.findUnique({where:{email}});
    if(!user) throw new BadRequestException("Invalid credentials");

    if(!user || !user.password){
      throw new UnauthorizedException('Invalid credentials');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid) throw new NotAcceptableException("Invalid credentials");

    const {password:_, ...result} = user;
    return result;
  }

   async refreshToken(user:Pick<User, "id"|"email" | "role">){

    const payload = {sub:user.id, email:user.email, role:user.role}
    const {refreshToken, acsessToken} = await this.generateTokens(payload);

    const hasedRefreshToken = await bcrypt.hash(refreshToken, 10);

    await this.prisma.user.update({where:{id:user.id}, data:{hashedRefreshToken:hasedRefreshToken}});

    return { 
      acsessToken,
      refreshToken
     };
  }

  async logout(id:string){
    return this.prisma.user.update({where:{id}, data:{hashedRefreshToken:null, isActive:false}});
  }

  async findById(id:string){
    const user = await this.prisma.user.findUnique({where:{id}});
    //check if doesn't user
    if(!user) throw new UnauthorizedException("User not found!");

    // return user nececery values
     return{
      id:user.id,
      email:user.email,
      role:user.role,
      fullName:user.fullName,
      imageUrl:user.imageUrl,
     }
  }

  private async findOrCreateGoogleUser(data:{
    googleId:string,
    email:string,
    fullName:string,
    imageUrl:string | null,
  }){
    // fing user with googleId
    let user = await this.prisma.user.findFirst({
      where:{
        OR:[{ googleId: data.googleId }, { email: data.email }],
      }
    });

    // if user not found, create new user
    if(!user){
      user = await this.prisma.user.create({
        data:{
          email:data.email,
          googleId:data.googleId,
          fullName:data.fullName,
          imageUrl:data.imageUrl || null,
        }
      });
      return user;
    }

    // if exist user in database, but has not googleId
    if(!user.googleId){
      await this.prisma.user.update({
        where:{id:user.id},
        data:{
          googleId:data.googleId,
          imageUrl: user.imageUrl ?? data.imageUrl,
        }
      })
    }
    return user;
  }

async loginWithGoogle(accessToken: string) {
  const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    throw new UnauthorizedException("Invalid Google access token");
  }

  const payload = (await res.json()) as GoogleUserInfo;

  if (!payload.sub || !payload.email) {
    throw new UnauthorizedException("Invalid Google user profile");
  }

  const user = await this.findOrCreateGoogleUser({
    googleId: payload.sub,
    email: payload.email,
    fullName: payload.name ?? payload.email.split("@")[0],
    imageUrl: payload.picture || null,
  });

  const { acsessToken, refreshToken } = await this.generateTokens({
    sub: user.id,
    email: user.email,
    role: user.role,
  });

  const safeUser = {
    id: user.id,
    email: user.email,
    fullName: user.fullName,
    role: user.role,
    imageUrl: user.imageUrl,
  };

  return {
    acsessToken,
    refreshToken,
    user: safeUser,
  };
}

}
