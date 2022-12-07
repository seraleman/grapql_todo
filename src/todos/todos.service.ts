import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateTodoInput, UpdateTodoInput } from './dtos/inputs';
import { StatusArgs } from './dtos/args/status.args';
import { Todo } from './schemas/todo.schema';

@Injectable()
export class TodosService {
  private todos: Todo[] = [
    { id: 1, description: 'Piedra del Alma', done: false },
    { id: 2, description: 'Piedra del Espacio', done: true },
    { id: 3, description: 'Piedra del Poder', done: false },
  ];

  get getTotalTodos() {
    return this.todos.length;
  }

  get getCompletedTodos() {
    return this.todos.filter((todo) => todo.done).length;
  }

  get getPendingTodos() {
    return this.todos.filter((todo) => !todo.done).length;
  }

  findAll({ status }: StatusArgs): Todo[] {
    if (status !== undefined)
      return this.todos.filter((todo) => todo.done === status);
    return this.todos;
  }

  findById(id: number): Todo {
    const todo = this.todos.find((todo) => todo.id === id);
    if (!todo) throw new NotFoundException(`Todo with id ${id} not found`);
    return todo;
  }

  create({ description }: CreateTodoInput): Todo {
    const todo = new Todo();
    todo.description = description;
    todo.id = Math.max(...this.todos.map((todo) => todo.id), 0) + 1;
    this.todos.push(todo);
    return todo;
  }

  update({ id, description, done }: UpdateTodoInput): Todo {
    const todoToUpdate = this.findById(id);

    if (description) todoToUpdate.description = description;
    if (done !== undefined) todoToUpdate.done = done;

    this.todos = this.todos.map((todo) => {
      return todo.id === id ? todoToUpdate : todo;
    });
    return todoToUpdate;
  }

  deleteById(id: number): Todo {
    const todoToDelete = this.findById(id);
    this.todos = this.todos.filter((todo) => {
      return todo.id !== id;
    });
    return todoToDelete;
  }
}
