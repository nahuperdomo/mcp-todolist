import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoListsModule } from './todo_lists/todo_lists.module';
import { TodoItemsModule } from './todo_items/todo_items.module';
import { McpModule } from './mcp/mcp.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TodoListsModule,
    TodoItemsModule,
    McpModule
  ],
})
export class AppModule { }
