import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRecordInput } from './dto/create-record.input';
import { UpdateRecordInput } from './dto/update-record.input';
import { Record } from './entities/record.entity';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RecordService {
  constructor(
    @InjectRepository(Record)
    private recordsRepository: Repository<Record>,
    private dataSource: DataSource,
  ) {}

  async create(createRecordInput: CreateRecordInput) {
    let savedRecord: Record;
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const record = queryRunner.manager.create(Record, createRecordInput);
      savedRecord = await this.recordsRepository.save(record);
      await queryRunner.commitTransaction();
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw e;
    } finally {
      await queryRunner.release();
    }
    return savedRecord;
  }

  async findAll() {
    return this.recordsRepository.find();
  }

  async findOne(id: number) {
    const record = await this.recordsRepository.findOne({ where: { id } });

    if (!record) {
      throw new NotFoundException(
        `Record with id: "${id}" doees not exist in database.`,
      );
    }

    return record;
  }

  async update(updateRecordInput: UpdateRecordInput) {
    await this.findOne(updateRecordInput.id);
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await this.recordsRepository.save(updateRecordInput);
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
