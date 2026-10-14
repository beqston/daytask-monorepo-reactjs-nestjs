import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import bcrypt from "bcrypt";
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class UsersService {
  constructor(
    private prisma:PrismaService, 
    private configService:ConfigService,
    private jwtService:JwtService
  ){}

  async create(createUserDto: CreateUserDto) {
  // object destructuring
    const {password, ...userData} =  createUserDto;

    // check is email exist
    const isEmail = await this.prisma.user.findUnique({where:{email:userData.email}});
    if(isEmail) throw new ConflictException("Email already exist!");

    // hashed password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create new user
    const newUser = await this.prisma.user.create({
      data:{
        ...userData,
        password:hashedPassword
      }
    });

    const { password: _, ...result } = newUser;

    const payload = {sub:newUser.id, email:newUser.email, role:newUser.role};

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret:this.configService.getOrThrow<string>("auth.jwtAccessSecret"),
        expiresIn:this.configService.getOrThrow<string>("auth.jwtAccessExpiresIn") as any
      }),

      this.jwtService.signAsync(payload, {
        secret:this.configService.getOrThrow<string>("auth.jwtRefreshSecret"),
        expiresIn: this.configService.getOrThrow<string>("auth.jwtRefreshExpiresIn") as any
      })
    ]);

    return {
      user:result,
      accessToken,
      refreshToken
    };
  }

  findAll(currentUserId:string) {
    return this.prisma.user.findMany({
      where:{
        id:{
          not:currentUserId
        }
      },
      select:{
        id:true,
        email:true,
        imageUrl:true,
        fullName:true
      }
    });
  }

}
