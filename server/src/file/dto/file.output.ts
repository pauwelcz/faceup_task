import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class File {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  id: number;

  @Field(() => Int, { description: 'Example field (placeholder)' })
  recordId: number;

  @Field({ description: 'Example field (placeholder)' })
  filename: string;

  @Field({ description: 'Example field (placeholder)' })
  extension: string;

  @Field()
  created_at: Date;

  @Field({ nullable: true })
  updated_at: Date;
}
