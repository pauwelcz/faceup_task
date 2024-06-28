import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class File {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  recordId: number;

  @Field()
  filename: string;

  @Field({ description: 'S3 bucket name, where file is uploaded' })
  bucket: string;

  @Field()
  created_at: Date;

  @Field({ nullable: true })
  updated_at: Date;
}
