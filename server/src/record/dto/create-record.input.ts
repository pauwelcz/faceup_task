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

  @Field(() => [GraphQLUpload], {
    description: 'Input for the profile image files.',
    nullable: true,
  })
  @IsOptional()
  @IsArray()
  files?: Promise<Upload>[];
}
