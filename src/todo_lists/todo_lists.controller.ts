import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { TodoListsService } from './todo_lists.service';
import { CreateTodoListDto } from './dtos/create-todo_list';
import { UpdateTodoListDto } from './dtos/update-todo_list';
import { TodoList } from './entities/todo_list.entity';

@Controller('api/todolists')
export class TodoListsController {
  constructor(private readonly todoListsService: TodoListsService) {}

  @Get()
  async all(): Promise<TodoList[]> {
    return await this.todoListsService.all();
  }

  @Get(':todoListId')
  async get(@Param('todoListId', ParseIntPipe) id: number): Promise<TodoList> {
    return await this.todoListsService.get(id);
  }

  @Post()
  async create(@Body() dto: CreateTodoListDto): Promise<TodoList> {
    return await this.todoListsService.create(dto);
  }

  @Put(':todoListId')
  async update(
    @Param('todoListId', ParseIntPipe) id: number,
    @Body() dto: UpdateTodoListDto,
  ): Promise<TodoList> {
    return await this.todoListsService.update(id, dto);
  }

  @Delete(':todoListId')
  async delete(@Param('todoListId', ParseIntPipe) id: number): Promise<void> {
    return await this.todoListsService.delete(id);
  }
}
