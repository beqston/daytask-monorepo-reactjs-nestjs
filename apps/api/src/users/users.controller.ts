import { Controller, Get, Post, Body, Patch, Param, Delete, ConflictException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import bcrypt from "bcrypt";

@Controller({path:'users', version:"1"})
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private prisma:PrismaService  
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    // object destructuring
    const {password, ...userData} =  createUserDto;

    // check is email exist
    const isEmail = await this.prisma.user.findFirst({where:{email:userData.email}});
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

    return newUser;
  }

  
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
