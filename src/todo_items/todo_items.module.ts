import { Module } from '@nestjs/common';
import { TodoItemsService } from './todo_items.service';
import { TodoItemsController } from './todo_items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoItem } from './entities/todo_item.entity';
import { TodoList } from '../todo_lists/entities/todo_list.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TodoItem, TodoList])],
  controllers: [TodoItemsController],
  providers: [TodoItemsService],
  exports: [TodoItemsService], // <-- Esto es importante
})
export class TodoItemsModule {}
