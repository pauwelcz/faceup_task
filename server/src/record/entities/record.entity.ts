import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Record {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
