import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoList } from './entities/todo_list.entity';
import { CreateTodoListDto } from './dtos/create-todo_list';
import { UpdateTodoListDto } from './dtos/update-todo_list';

@Injectable()
export class TodoListsService {
  constructor(
    @InjectRepository(TodoList)
    private readonly todoListsRepository: Repository<TodoList>,
  ) {}

  async all(): Promise<TodoList[]> {
    return this.todoListsRepository.find({ relations: ['items'] });
  }

  async get(id: number): Promise<TodoList> {
    const list = await this.todoListsRepository.findOne({
      where: { id },
      relations: ['items'],
    });

    if (!list) throw new NotFoundException('TodoList not found');
    return list;
  }

  async create(dto: CreateTodoListDto): Promise<TodoList> {
    const newList = this.todoListsRepository.create({ name: dto.name });
    return this.todoListsRepository.save(newList);
  }

  async update(id: number, dto: UpdateTodoListDto): Promise<TodoList> {
    const list = await this.get(id);
    list.name = dto.name;
    return this.todoListsRepository.save(list);
  }

  async delete(id: number): Promise<void> {
    const result = await this.todoListsRepository.delete(id);
    if (!result.affected) {
      throw new NotFoundException('TodoList not found');
    }
  }
}
