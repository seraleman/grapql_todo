import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Todo {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  description: string;

  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  @Field(() => Boolean)
  done: boolean = false;
}
