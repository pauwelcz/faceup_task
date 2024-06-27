import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FileService } from './file.service';
import { CreateFileInput } from './dto/create-file.input';
import { File } from './dto/file.output';
import { FilesAndCount } from './dto/files.output';

@Resolver(() => File)
export class FileResolver {
  constructor(private readonly fileService: FileService) {}

  @Mutation(() => File)
  createFile(@Args('createFileInput') createFileInput: CreateFileInput) {
    return this.fileService.create(createFileInput);
  }

  @Query(() => File)
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.fileService.findOne(id);
  }

  @Query(() => FilesAndCount)
  filesByRecord(@Args('recordId', { type: () => Int }) recordId: number) {
    return this.fileService.findByRecord(recordId);
  }
}
