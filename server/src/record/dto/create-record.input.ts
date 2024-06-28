import { InputType, Field, Int } from '@nestjs/graphql';
import {
  IsArray,
  IsOptional,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

import { GraphQLUpload, Upload } from 'graphql-upload-ts';

@InputType()
export class CreateRecordInput {
  @Field({ description: 'Name of user' })
  @MinLength(1)
  @MaxLength(255)
  name: string;

  @Min(1)
  @Field(() => Int)
  age: number;

  @MinLength(1)
  @MaxLength(255)
  @Field({ nullable: true, description: 'Record title' })
  title: string;

  @MinLength(1)
  @MaxLength(1024)
  @IsOptional()
  @Field({ nullable: true, description: 'Record note' })
  note: string;

  @Field(() => [GraphQLUpload], {
    description: 'Input for attached files.',
    nullable: true,
  })
  @IsOptional()
  @IsArray()
  files?: Promise<[Upload]>;
}
