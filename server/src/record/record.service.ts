import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRecordInput } from './dto/create-record.input';
import { UpdateRecordInput } from './dto/update-record.input';
import { Record } from './entities/record.entity';
import { DataSource, In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RecordsAndCount } from './dto/records.output';
import { FetchRecordsArgs } from './dto/find-records.input';
import { FileService } from '../file/file.service';
import { File } from '../file/entities/file.entity';

@Injectable()
export class RecordService {
  constructor(
    @InjectRepository(Record)
    private recordsRepository: Repository<Record>,
    private dataSource: DataSource,
    private fileService: FileService,
  ) {}

  async create(createRecordInput: CreateRecordInput): Promise<Record> {
    let savedRecord: Record;

    const { files } = createRecordInput;

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const record = queryRunner.manager.create(Record, createRecordInput);
      savedRecord = await this.recordsRepository.save(record);

      // saving files
      const promisedFiles = await Promise.all(files);
      const filesToCreateDB = [];
      for (const file of promisedFiles) {
        filesToCreateDB.push(
          queryRunner.manager.create(File, {
            extension: 'txt',
            filename: `${new Date().valueOf()}_${file['filename']}`,
            recordId: record.id,
          }),
        );
      }

      await queryRunner.manager.save(File, filesToCreateDB);
      await queryRunner.commitTransaction();
      return savedRecord;
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw e;
    } finally {
      await queryRunner.release();
    }
    return this.findOne(2);
  }

  async findAll(args: FetchRecordsArgs): Promise<RecordsAndCount> {
    const { offset, limit } = args;
    const recordsAndCount = await this.recordsRepository.findAndCount({
      take: limit,
      skip: offset,
      order: {
        created_at: 'DESC',
      },
    });
    return {
      totalNumber: recordsAndCount[1],
      records: recordsAndCount[0],
    };
  }

  async findOne(id: number): Promise<Record> {
    const record = await this.recordsRepository.findOne({ where: { id } });

    if (!record) {
      throw new NotFoundException(
        `Record with id: "${id}" doees not exist in database.`,
      );
    }

    return record;
  }

  async findByIds(ids: number[]): Promise<Record[]> {
    const records = await this.recordsRepository.find({
      where: { id: In(ids) },
    });

    return records;
  }

  async update(updateRecordInput: UpdateRecordInput): Promise<Record> {
    const { updatedFilesToDelete } = updateRecordInput;
    const recordToUpdate = await this.findOne(updateRecordInput.id);
    const { id } = recordToUpdate;
    const existingFiles = await this.fileService.findByRecord(id);

    const uploadedFilesToDeleteExists = updatedFilesToDelete.every((item) =>
      existingFiles.files.map((file) => file.id).includes(item),
    );

    if (!uploadedFilesToDeleteExists) {
      throw new BadRequestException(
        `Some files to delete does not exist in this record.`,
      );
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await this.recordsRepository.save(updateRecordInput);
      await this.fileService.removeFiles(updatedFilesToDelete, queryRunner);
      await queryRunner.commitTransaction();
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw e;
    } finally {
      await queryRunner.release();
    }

    return this.findOne(updateRecordInput.id);
  }

  async remove(id: number): Promise<Record> {
    const recordToDelete = await this.findOne(id);
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.remove(recordToDelete);
      await queryRunner.commitTransaction();
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw e;
    } finally {
      await queryRunner.release();
    }

    return { ...recordToDelete, id };
  }
}
