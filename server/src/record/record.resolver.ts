import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RecordService } from './record.service';
import { CreateRecordInput } from './dto/create-record.input';
import { UpdateRecordInput } from './dto/update-record.input';
import { RecordsAndCount } from './dto/records.output';
import { Record } from './dto/record.output';
import { FetchRecordsArgs } from './dto/find-records.input';

@Resolver(() => Record)
export class RecordResolver {
  constructor(private readonly recordService: RecordService) {}

  @Mutation(() => Record)
  createRecord(
    @Args('createRecordInput') createRecordInput: CreateRecordInput,
  ) {
    return this.recordService.create(createRecordInput);
  }

  @Query(() => RecordsAndCount, { name: 'records' })
  findAll(
    @Args('findRecordsArgs') args: FetchRecordsArgs = { limit: 25, offset: 0 },
  ): Promise<RecordsAndCount> {
    return this.recordService.findAll(args);
  }

  @Mutation(() => Record)
  updateRecord(
    @Args('updateRecordInput') updateRecordInput: UpdateRecordInput,
  ): Promise<Record> {
    return this.recordService.update(updateRecordInput);
  }

  @Mutation(() => Record)
  removeRecord(@Args('id', { type: () => Int }) id: number): Promise<Record> {
    return this.recordService.remove(id);
  }
}
