import { Resolver, Query, Float, Int, Args } from '@nestjs/graphql';

@Resolver()
export class HelloWorldResolver {
  @Query(() => String, {
    name: 'helloWorld',
    description: "Retorna 'Hola Mundo'",
  })
  Hello(): string {
    return 'Hola Mundo';
  }

  @Query(() => Float, { name: 'randomNumber' })
  getRandomNumber(): number {
    return Math.random() * 100;
  }

  @Query(() => Int, {
    name: 'randomFromZero',
    description: 'Devuelve un númeror random de 0 a 10',
  })
  getRandomFromZero(
    @Args('to', { nullable: true, type: () => Int }) to = 10,
  ): number {
    return Math.floor(Math.random() * (to + 1));
  }
}
