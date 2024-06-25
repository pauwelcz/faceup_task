import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Record } from './record.output';

@ObjectType()
export class RecordsAndCount {
  @Field(() => Int)
  totalNumber: number;

  @Field(() => [Record])
  records: Record[];
}
