import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(
    private prisma: PrismaService,
  ) {}

  private readonly taskInclude = {
    members: { select: { id: true, fullName: true, imageUrl: true } },
    author: { select: { id: true, fullName: true, imageUrl: true } },
  } as const;

  async createTask(createTaskDto: CreateTaskDto, authorId: string) {
    const { memberIds, tzOffset, ...rest } = createTaskDto;
    return this.prisma.task.create({
      data: {
        ...rest,
        authorId,
        members: {
          connect: memberIds.map((id) => ({ id })),
        },
      },
      include: this.taskInclude,
    });
  }

  async findAllTask() {
    const tasks = await this.prisma.task.findMany({
      include: this.taskInclude,
    });
    return tasks;
  }

  findCompletedTasks() {
    return this.prisma.task.findMany({
      where: {
        isCompleted: true,
      },
      include: this.taskInclude,
    });
  }

  findPendingTasks() {
    return this.prisma.task.findMany({
      where: {
        isCompleted: false,
      },
      include: this.taskInclude,
    });
  }

  findPendingTasksFromStart() {
    return this.prisma.task.findMany({
      where: {
        isCompleted: false,
      },
      include: this.taskInclude,
      orderBy:{
        date:"desc"
      },
      take:3
    });
  }

async myTasks(id: string, date?: string) {
  if (date && !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    throw new BadRequestException('Date must be in YYYY-MM-DD format');
  }

  const targetDate = date ?? new Date().toISOString().split('T')[0];

  return this.prisma.task.findMany({
    where: {
      date: targetDate,
      OR: [
        { authorId: id },
        { members: { some: { id } } },
      ],
    },
    include: this.taskInclude,
    orderBy: { time: 'desc' },
  });
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