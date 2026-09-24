import { Controller, HttpCode, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '@prisma/client';
import { LocalGuard } from './guards/local.guard';
import {type Request, type Response} from "express"
import { Public } from './decorators/public-decorator';
import { RefreshGuard } from './guards/jwt-refresh.guard';
import { GetUser } from './decorators/get-user.decorator';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller({path:"auth", version:"1"})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post()
  @UseGuards(LocalGuard)
  create(@Req() req: Request, @Res({passthrough:true}) res:Response) {
    return this.authService.login(req.user as Omit<User, 'password'>, res);
  }


  @Public()
  @Post("refresh-token")
  @UseGuards(RefreshGuard)
  async refreshToken(
    @GetUser() user: Pick<User, 'id' | 'email' | 'role'>, 
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.refreshToken(user, res);
  }

  @Post("logout")
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async logout(@GetUser("id") id:string, @Res({passthrough:true}) res:Response){
    return this.authService.logout(id, res)
  }
}
