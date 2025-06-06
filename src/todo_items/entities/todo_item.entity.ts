import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { TodoList } from '../../todo_lists/entities/todo_list.entity';

@Entity()
export class TodoItem {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @Column({ default: false })
    completed: boolean;

    @ManyToOne(() => TodoList, list => list.items, { onDelete: 'CASCADE' })
    list: TodoList;
}
