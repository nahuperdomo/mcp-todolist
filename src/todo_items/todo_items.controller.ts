import {
  Controller,
  Post,
  Param,
  Body,
  ParseIntPipe,
  Put,
  Patch,
  Delete,
} from '@nestjs/common';
import { TodoItemsService } from './todo_items.service';
import { CreateTodoItemDto } from './dto/create-todo_item.dto';
import { TodoItem } from './entities/todo_item.entity';

@Controller('api')
export class TodoItemsController {
  constructor(private readonly todoItemsService: TodoItemsService) {}

  @Post('todolists/:listId/items')
  create(
    @Param('listId', ParseIntPipe) listId: number,
    @Body() dto: CreateTodoItemDto,
  ): Promise<TodoItem> {
    return this.todoItemsService.createItemInList(listId, dto);
  }

  @Put('todoitems/:itemId')
  update(
    @Param('itemId', ParseIntPipe) itemId: number,
    @Body() body: { description: string },
  ): Promise<TodoItem> {
    return this.todoItemsService.updateItem(itemId, body);
  }

  @Patch('todoitems/:itemId/complete')
  complete(@Param('itemId', ParseIntPipe) itemId: number): Promise<TodoItem> {
    return this.todoItemsService.markItemAsComplete(itemId);
  }

  @Delete('todoitems/:itemId')
  remove(@Param('itemId', ParseIntPipe) itemId: number): Promise<void> {
    return this.todoItemsService.deleteItem(itemId);
  }
}
