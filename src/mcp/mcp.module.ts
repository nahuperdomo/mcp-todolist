import { Module } from '@nestjs/common';
import { McpController } from './mcp.controller';
import { McpService } from './mcp.service';
import { TodoItemsModule } from '../todo_items/todo_items.module';
import { TodoListsModule } from '../todo_lists/todo_lists.module';

@Module({
  imports: [TodoItemsModule, TodoListsModule],
  controllers: [McpController],
  providers: [McpService],
})
export class McpModule {}
