import { Field, Int, ObjectType } from '@nestjs/graphql';
import { File } from './file.output';

@ObjectType()
export class FilesAndCount {
  @Field(() => Int)
  totalNumber: number;

  @Field(() => [File])
  files: File[];
}
