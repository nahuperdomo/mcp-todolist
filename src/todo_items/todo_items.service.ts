import { Injectable, NotFoundException } from '@nestjs/common';
import { TodoItem } from './entities/todo_item.entity';
import { CreateTodoItemDto } from './dto/create-todo_item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoList } from 'src/todo_lists/entities/todo_list.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodoItemsService {
  constructor(
    @InjectRepository(TodoItem)
    private readonly todoItemsRepository: Repository<TodoItem>,
    @InjectRepository(TodoList)
    private readonly todoListsRepository: Repository<TodoList>,
  ) {}

  async createItemInList(
    listId: number,
    dto: CreateTodoItemDto,
  ): Promise<TodoItem> {
    const list = await this.todoListsRepository.findOne({
      where: { id: listId },
    });

    if (!list) {
      throw new NotFoundException('TodoList not found');
    }

    const item = this.todoItemsRepository.create({
      description: dto.description,
      completed: false,
      list,
    });

    return this.todoItemsRepository.save(item);
  }

  async updateItem(
    itemId: number,
    dto: { description: string },
  ): Promise<TodoItem> {
    const item = await this.todoItemsRepository.findOne({
      where: { id: itemId },
    });

    if (!item) {
      throw new NotFoundException('TodoItem not found');
    }

    item.description = dto.description;
    return this.todoItemsRepository.save(item);
  }

  async markItemAsComplete(itemId: number): Promise<TodoItem> {
    const item = await this.todoItemsRepository.findOne({
      where: { id: itemId },
    });

    if (!item) {
      throw new NotFoundException('TodoItem not found');
    }

    item.completed = true;
    return this.todoItemsRepository.save(item);
  }

  async deleteItem(itemId: number): Promise<void> {
    const item = await this.todoItemsRepository.findOne({
      where: { id: itemId },
    });

    if (!item) {
      throw new NotFoundException('TodoItem not found');
    }

    await this.todoItemsRepository.remove(item);
  }
}
