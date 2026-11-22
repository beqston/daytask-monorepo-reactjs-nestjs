import { Controller, Get, Post, Body, Res, Delete, Patch, UseGuards, UseInterceptors, Req, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Public } from 'src/auth/decorators/public-decorator';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import {type Response } from 'express';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

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

  @Patch('update-user')
  updateUser(@GetUser("id") id:string, @Body() dto:UpdateUserDto){
    return this.usersService.updateUser(id, dto);
  }

  @Post('change-privacy')
  changePrivacy(@GetUser('id') id:string, @Body("isPublic") isPublic:boolean){
    return this.usersService.changePrivacy(id, isPublic);
  }

  @Post('change-active')
  changeActive(@GetUser('id') id:string, @Body("isActive") isActive:boolean){
    return this.usersService.changeActive(id, isActive);
  }

  @Get('check-privacy')
  checkPrivacy(@GetUser('id') id:string){
    return this.usersService.checkPrivacy(id)
  }

  @Delete('delete-account')
  deleteUser(@GetUser("id") id:string, @Res({passthrough:true}) res:Response){
    return this.usersService.deleteUser(id, res);
  }

  @Get()
  findAll(@GetUser("id") id:string) {
    return this.usersService.findAll(id);
  }

  @Patch("me/avatar")
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor("image"))
  uploadAvatar(
    @Req() req,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 4 * 1024 * 1024 }),
          new FileTypeValidator({ fileType: /^image\/(jpeg|png|webp)$/ }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.usersService.updateAvatar(req.user.id, file);
  }
}