import { Controller, Get, Post, Body, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Public } from 'src/auth/decorators/public-decorator';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import {type Response } from 'express';

@Controller({path:'users', version:"1"})
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}
  @Public(true)
  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res({passthrough:true}) res:Response) {
    const {user, accessToken, refreshToken} =  await this.usersService.create(createUserDto);

    res.cookie("access_token", accessToken, {
      secure:process.env.NODE_ENV == 'production',
      httpOnly:true,
      sameSite:"lax",
      maxAge: 15 * 60 * 1000
    });
    res.cookie("refresh_token", refreshToken, {
      secure:process.env.NODE_ENV === 'production',
      httpOnly:true,
      sameSite:"lax",
      maxAge:7 * 24 * 60 * 60 * 1000
    });

    return user;
  }

  @Post('change-privacy')
  changePrivacy(@GetUser('id') id:string, @Body("isPublic") isPublic:boolean){
    return this.usersService.changePrivacy(id, isPublic);
  }

  @Get('check-privacy')
  isPublic(@GetUser('id') id:string){
    return this.usersService.isPublic(id)
  }

  @Get()
  findAll(@GetUser("id") id:string) {
    return this.usersService.findAll(id);
  }
}