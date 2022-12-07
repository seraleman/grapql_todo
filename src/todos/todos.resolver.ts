import { Resolver, Query, Args, Mutation, Int } from '@nestjs/graphql';

import { CreateTodoInput, UpdateTodoInput } from './dtos/inputs';
import { StatusArgs } from './dtos/args/status.args';
import { Todo } from './schemas/todo.schema';
import { TodosService } from './todos.service';
import { AggregationsType } from './dtos/types/aggregations.type';

@Resolver(() => Todo)
export class TodosResolver {
  constructor(private readonly todoService: TodosService) {}

  @Query(() => [Todo], { name: 'todos' })
  findAll(@Args() statusArgs: StatusArgs) {
    return this.todoService.findAll(statusArgs);
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

  @Mutation(() => Todo, { name: 'deleteTodo' })
  deleteTodo(@Args('id') id: number) {
    return this.todoService.deleteById(id);
  }

  @Query(() => Int)
  totalTodos(): number {
    return this.todoService.getTotalTodos;
  }

  @Query(() => Int)
  completedTodos(): number {
    return this.todoService.getCompletedTodos;
  }

  @Query(() => Int)
  pendingTodos(): number {
    return this.todoService.getPendingTodos;
  }

  @Query(() => AggregationsType)
  aggregations(): AggregationsType {
    return {
      total: this.todoService.getTotalTodos,
      pending: this.todoService.getPendingTodos,
      completed: this.todoService.getCompletedTodos,
    };
  }
}
