import { Test, TestingModule } from '@nestjs/testing';
import { TodoListsController } from './todo_lists.controller';
import { TodoListsService } from './todo_lists.service';

describe('TodoListsController', () => {
  let todoListsController: TodoListsController;
  let mockService: {
    all: jest.Mock;
    get: jest.Mock;
    update: jest.Mock;
    create: jest.Mock;
    delete: jest.Mock;
  };

  beforeEach(async () => {
    mockService = {
      all: jest.fn().mockResolvedValue([
        { id: 1, name: 'test1' },
        { id: 2, name: 'test2' },
      ]),
      get: jest.fn().mockResolvedValue({ id: 1, name: 'test1' }),
      update: jest.fn().mockResolvedValue({ id: 1, name: 'modified' }),
      create: jest.fn().mockResolvedValue({ id: 3, name: 'new' }),
      delete: jest.fn().mockResolvedValue(undefined),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoListsController],
      providers: [
        {
          provide: TodoListsService,
          useValue: mockService,
        },
      ],
    }).compile();

    todoListsController = module.get<TodoListsController>(TodoListsController);
  });

  describe('all', () => {
    it('should return the list of todolist', async () => {
      const result = await todoListsController.all();
      expect(result).toEqual([
        { id: 1, name: 'test1' },
        { id: 2, name: 'test2' },
      ]);
    });
  });

  describe('get', () => {
    it('should return the todolist with the given id', async () => {
      const result = await todoListsController.get(1);
      expect(result).toEqual({ id: 1, name: 'test1' });
    });
  });

  describe('update', () => {
    it('should update the todolist with the given id', async () => {
      const result = await todoListsController.update(1, {
        name: 'modified',
      });
      expect(result).toEqual({ id: 1, name: 'modified' });
    });
  });

  describe('create', () => {
    it('should create a new todolist', async () => {
      const result = await todoListsController.create({ name: 'new' });
      expect(result).toEqual({ id: 3, name: 'new' });
    });
  });

  describe('delete', () => {
    it('should delete the todolist with the given id', async () => {
      await expect(() => todoListsController.delete(1)).not.toThrow();
    });
  });
});
