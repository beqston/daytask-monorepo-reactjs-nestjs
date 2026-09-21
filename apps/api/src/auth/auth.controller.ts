import { Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '@prisma/client';
import { LocalGuard } from './guards/local.guard';
import {type Request, type Response} from "express"
import { Public } from './decorators/public-decorator';

@Controller({path:"auth", version:"1"})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post()
  @UseGuards(LocalGuard)
  async create(@Req() req: Request, @Res({passthrough:true}) res:Response) {
    const user = await this.authService.login(req.user as Omit<User, 'password'>);
    res.cookie('access_token', user.token, {
      secure:true,
      httpOnly:true,
      sameSite:"lax",
      maxAge:15 * 60 * 1000
    });

    res.cookie("refresh_token", user.hashedRefreshToken, {
      secure:true,
      httpOnly:true,
      sameSite:"lax",
      maxAge:7 * 24 * 60 * 60 * 1000
    });

    return user;
  }
}
