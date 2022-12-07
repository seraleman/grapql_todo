import { ArgsType, Field } from '@nestjs/graphql';
import { IsBoolean, IsOptional } from 'class-validator';

@ArgsType()
export class StatusArgs {
  @Field(() => Boolean, {
    nullable: true,
    description: 'Return todos done or not done',
  })
  @IsBoolean()
  @IsOptional()
  status?: boolean;
}
