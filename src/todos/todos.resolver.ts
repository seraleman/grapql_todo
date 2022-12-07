import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { CreateTodoInput } from './dtos/inputs/create-todo.input';
import { UpdateTodoInput } from './dtos/inputs/update-todo.input';

import { Todo } from './schemas/todo.schema';
import { TodosService } from './todos.service';

@Resolver()
export class TodosResolver {
  constructor(private readonly todoService: TodosService) {}

  @Query(() => [Todo], { name: 'todos' })
  findAll() {
    return this.todoService.findAll();
  }

  @Query(() => Todo, { name: 'todoById' })
  findOne(@Args('id') id: number) {
    return this.todoService.findById(id);
  }

  @Mutation(() => Todo, { name: 'createTodo' })
  createTodo(@Args('createTodoInput') createTodoInput: CreateTodoInput) {
    return this.todoService.create(createTodoInput);
  }

  @Mutation(() => Todo, { name: 'updateTodo' })
  updateTodo(@Args('updateTodoInput') updateTodoInput: UpdateTodoInput) {
    return this.todoService.update(updateTodoInput);
  }
}
