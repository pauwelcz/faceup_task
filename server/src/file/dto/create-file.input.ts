import { InputType, Field } from '@nestjs/graphql';
import { MinLength, MaxLength } from 'class-validator';

@InputType()
export class CreateFileInput {
  @Field({ description: 'Name of user' })
  @MinLength(1)
  @MaxLength(255)
  filename: string;

  @MinLength(1)
  @MaxLength(255)
  @Field({ description: 'Example field (placeholder)' })
  extension: string;
}
