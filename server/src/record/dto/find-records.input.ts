import { Field, Int, InputType } from '@nestjs/graphql';
import { IsOptional, Max, Min } from 'class-validator';

@InputType()
export class FetchRecordsArgs {
  @IsOptional()
  @Field(() => Int)
  @Min(0)
  offset: number = 0;

  @Field(() => Int)
  @IsOptional()
  @Min(1)
  @Max(50)
  limit: number = 25;
}
