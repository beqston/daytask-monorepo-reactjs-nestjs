import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import bcrypt from "bcrypt";


@Injectable()
export class UsersService {
  constructor(
    private prisma:PrismaService  
  ){}

  async create(createUserDto: CreateUserDto) {
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

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
