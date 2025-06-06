import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { TodoItem } from '../../todo_items/entities/todo_item.entity';

@Entity()
export class TodoList {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => TodoItem, (item) => item.list, { cascade: true })
  items: TodoItem[];
}
