import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';

@Controller({path:'tasks', version:'1'})
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto, @GetUser("id") authorId:string) {
    return this.tasksService.createTask(createTaskDto, authorId);
  }
  

  @Get()
  findAll() {
    return this.tasksService.findAllTask();
  }

  @Get('completed')
  findCompletedTasks(){
    return this.tasksService.findCompletedTasks();
  }

  @Get("pending")
  findPendingTasks(){
    return this.tasksService.findPendingTasks();
  }

  @Get("pending/from-start")
  findPendingTasksFromStart(){
    return this.tasksService.findPendingTasksFromStart();
  }

  @Get('/my-tasks')
  myTasks(@GetUser('id') id:string, @Query() date?:string){
    return this.tasksService.myTasks(id, date)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(+id);
  }
}
