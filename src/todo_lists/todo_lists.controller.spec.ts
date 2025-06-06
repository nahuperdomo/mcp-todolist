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
      all: jest.fn().mockReturnValue([
        { id: 1, name: 'test1' },
        { id: 2, name: 'test2' },
      ]),
      get: jest.fn().mockReturnValue({ id: 1, name: 'test1' }),
      update: jest.fn().mockReturnValue({ id: 1, name: 'modified' }),
      create: jest.fn().mockReturnValue({ id: 3, name: 'new' }),
      delete: jest.fn().mockReturnValue(undefined),
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
    it('should return the list of todolist', () => {
      expect(todoListsController.all()).toEqual([
        { id: 1, name: 'test1' },
        { id: 2, name: 'test2' },
      ]);
    });
  });

  describe('get', () => {
    it('should return the todolist with the given id', () => {
      expect(todoListsController.get(1)).toEqual({
        id: 1,
        name: 'test1',
      });
    });
  });

  describe('update', () => {
    it('should update the todolist with the given id', () => {
      expect(todoListsController.update(1, { name: 'modified' })).toEqual({
        id: 1,
        name: 'modified',
      });
    });
  });

  describe('create', () => {
    it('should create a new todolist', () => {
      expect(todoListsController.create({ name: 'new' })).toEqual({
        id: 3,
        name: 'new',
      });
    });
  });

  describe('delete', () => {
    it('should delete the todolist with the given id', () => {
      expect(() => todoListsController.delete(1)).not.toThrow();
    });
  });
});
