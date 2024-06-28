import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Record {
  @Field(() => Int)
  id: number;

  @Field({ description: 'User name' })
  name: string;

  @Field({ nullable: true })
  title: string;

  @Field({ nullable: true })
  note: string;

  @Field(() => Int)
  age: number;

  @Field()
  created_at: Date;

  @Field({ nullable: true })
  updated_at: Date;
}
