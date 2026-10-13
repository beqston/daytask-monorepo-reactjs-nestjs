import { Controller, Get, HttpCode, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '@prisma/client';
import {type Request, type Response} from "express"
import { Public } from './decorators/public-decorator';
import { RefreshGuard } from './guards/jwt-refresh.guard';
import { GetUser } from './decorators/get-user.decorator';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalGuard } from './guards/local.guard';

@Controller({path:"auth", version:"1"})
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Public()
  @Post('login')
  @UseGuards(LocalGuard)
  async create(@Req() req: Request, @Res({passthrough:true}) res:Response) {
    const {user, acsessToken, refreshToken} = await  this.authService.login(req.user as Omit<User, 'password'>);

    res.cookie('access_token', acsessToken, {
      secure:process.env.NODE_ENV === 'production',
      httpOnly:true,
      sameSite:"lax",
      maxAge:15 * 60 * 1000
    });

    res.cookie("refresh_token", refreshToken, {
      secure:process.env.NODE_ENV === 'production',
      httpOnly:true,
      sameSite:"lax",
      maxAge:7 * 24 * 60 * 60 * 1000
    });

    return {
      message: "Logged in successfully",
      user
    };
  }

  @Public()
  @Post("refresh-token")
  @UseGuards(RefreshGuard)
  async refreshToken(
    @GetUser() user: Pick<User, 'id' | 'email' | 'role'>, 
    @Res({ passthrough: true }) res: Response
  ) {
    const {acsessToken, refreshToken} = await this.authService.refreshToken(user);
    res.cookie("access_token", acsessToken, {
      secure:process.env.NODE_ENV === 'production',
      sameSite:"lax",
      httpOnly:true,
      maxAge: 15 * 60 * 1000
    });

    res.cookie("refresh_token", refreshToken, {
      secure:process.env.NODE_ENV === 'production',
      sameSite:"lax",
      httpOnly:true,
      maxAge: 7 * 24 * 60 * 60* 1000
    });
    return{ message: "Tokens refreshed successfully" };
  }

  @Post("logout")
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async logout(@GetUser("id") id:string, @Res({passthrough:true}) res:Response){
     await this.authService.logout(id);
    // cookie option
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const, 
    };

    // clear access token in cookie
    res.clearCookie("access_token", cookieOptions);

    // clear refresh token in cookkie
    res.clearCookie("refresh_token", cookieOptions);

    return {message:"Logged out successfully"}
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getMe(@GetUser("id") id:string){
    return this.authService.findById(id);
  }
}