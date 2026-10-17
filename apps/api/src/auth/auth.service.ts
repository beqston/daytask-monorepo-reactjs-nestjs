import { BadRequestException, Injectable, NotAcceptableException, UnauthorizedException } from '@nestjs/common';
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
      data: { hashedRefreshToken },
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
    return await this.prisma.user.update({where:{id}, data:{hashedRefreshToken:null}});
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
      imageUrl:user.imageUrl
     }
  }
}