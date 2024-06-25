import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Record {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  id: number;

  @Field({ description: 'Example field (placeholder)' })
  name: string;

  @Field({ nullable: true, description: 'Example field (placeholder)' })
  title: string;

  @Field({ nullable: true, description: 'Example field (placeholder)' })
  note: string;

  @Field(() => Int, { description: 'Example field (placeholder)' })
  age: number;

  @Field()
  created_at: Date;

  @Field({ nullable: true })
  updated_at: Date;
}
