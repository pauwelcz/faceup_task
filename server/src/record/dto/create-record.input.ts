import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateRecordInput {
  @Field({ description: 'Example field (placeholder)' })
  name: string;

  @Field(() => Int, { description: 'Example field (placeholder)' })
  age: number;

  @Field({ nullable: true, description: 'Example field (placeholder)' })
  title: string;

  @Field({ nullable: true, description: 'Example field (placeholder)' })
  note: string;
}
