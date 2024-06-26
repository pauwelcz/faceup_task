import { InputType, Field, Int } from '@nestjs/graphql';
import { IsOptional, MaxLength, Min, MinLength } from 'class-validator';
// @ts-ignore
import { GraphQLUpload, FileUpload } from 'graphql-upload';

@InputType()
export class CreateRecordInput {
  @Field({ description: 'Name of user' })
  @MinLength(1)
  @MaxLength(255)
  name: string;

  @Min(1)
  @Field(() => Int, { description: 'Example field (placeholder)' })
  age: number;

  @MinLength(1)
  @MaxLength(255)
  @Field({ nullable: true, description: 'Example field (placeholder)' })
  title: string;

  @MinLength(1)
  @MaxLength(1024)
  @IsOptional()
  @Field({ nullable: true, description: 'Example field (placeholder)' })
  note: string;

  @Field(() => [GraphQLUpload])
  @IsOptional()
  files?: Promise<FileUpload[]>;
}
