import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(
    private prisma:PrismaService,
  ){}

  async createTask(createTaskDto: CreateTaskDto, authorId:string) {
    const {memberIds, ...rest} = createTaskDto;
    return this.prisma.task.create({
      data:{
        ...rest,
        authorId,
        members:{
            connect: memberIds?.map((id) => ({ id })),
        }
      },
      include:{
        members:{
          select:{
            id:true,
            fullName:true,
            imageUrl:true
          }
        },
        author:{
          select:{
            id:true,
            fullName:true,
            imageUrl:true
          }
        }
      }
    })
  }
  
  async findAllTask() {
    const tasks = await this.prisma.task.findMany();
    return tasks;
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
