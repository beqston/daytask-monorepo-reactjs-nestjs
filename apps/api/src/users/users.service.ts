import { BadGatewayException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import bcrypt from "bcrypt";
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { Prisma } from '@prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class UsersService {
  constructor(
    private prisma:PrismaService, 
    private configService:ConfigService,
    private jwtService:JwtService,
    private cloudinaryService:CloudinaryService
  ){}
  private get cookieOptions() {
    return {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      sameSite: 'lax' as const,
    };
  }

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


  async deleteUser(id: string, res: Response) {
    try {
      await this.prisma.user.delete({ where: { id } });
    } catch (err) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === 'P2025'
      ) {
        throw new NotFoundException('User not found');
      }
      throw new InternalServerErrorException('User not deleted');
    }

    res.clearCookie('refresh_token', this.cookieOptions);
    res.clearCookie('access_token', this.cookieOptions);
    return { message: 'Account deleted' };
  }
  
  changePrivacy(id:string, isPublic:boolean){
    return this.prisma.user.update({
      where:{id},
      data:{
        isPublic
      }
    })
  }

  checkPrivacy(id:string){
    return this.prisma.user.findUnique(
      {
        where:{
          id
        },
        select:{
          isPublic:true,
          isActive:true,
        }
      }
    )
  }

  changeActive(id:string, isActive:boolean){
    return this.prisma.user.update({
      where:{id},
      data:{
        isActive
      }
    })
  }

  async updateUser(id:string, dto:UpdateUserDto){
    // body is email, fullName, or password
    const user = await this.prisma.user.findUnique({where:{id}});
    if (!user) throw new NotFoundException('User not found!');
    const data: Prisma.UserUpdateInput = {};

    if(dto.email && dto.email !== user.email){
      const taken = await this.prisma.user.findUnique({where:{email:dto.email}});
      if(taken) throw new ConflictException("Email already exist!");
      data.email = dto.email;
    }

    if(dto.fullName && dto.fullName !== user.fullName) data.fullName = dto.fullName;
    if(dto.password && dto.password !== user.password) data.password = await bcrypt.hash(dto.password, 10);

    const {password, ...updated} = await this.prisma.user.update({
      where:{id},
      data
    });

    return updated;
  }

  async updateAvatar(id:string, file:Express.Multer.File){
    const user = await this.prisma.user.findUnique({where:{id}});
    const oldPublicId = user?.imagePublicId;

    // upload new image
    const result = await this.cloudinaryService.uploadImage(file);

    //save urls in database
    const updated = await this.prisma.user.update({where:{id}, data:{
      imagePublicId:result.public_id,
      imageUrl:result.secure_url
    }});

    if(oldPublicId){
      await this.cloudinaryService.deleteImage(oldPublicId).catch(() => {});
    }

    return updated;
  }

  async removeAvatar(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: { imagePublicId: true },
    });

    if (!user?.imagePublicId) throw new NotFoundException("Image not found!");

    const updated = await this.prisma.user.update({
      where: { id },
      data: { imageUrl: null, imagePublicId: null },
      select: { id: true, imageUrl: true },
    });

    const deleted = await this.cloudinaryService.deleteImage(user.imagePublicId);
    if (!deleted) throw new BadGatewayException("Image was not deleted from Cloudinary");

    return updated;
  }
}
