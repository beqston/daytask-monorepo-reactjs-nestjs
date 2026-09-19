import { Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '@prisma/client';
import { LocalGuard } from './guards/local.guard';
import {type Request, type Response} from "express"

@Controller({path:"auth", version:"1"})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @UseGuards(LocalGuard)
  create(@Req() req: Request, @Res({passthrough:true}) res:Response) {
    return this.authService.login(req.user as Omit<User, 'password'>);
  }
 
}
