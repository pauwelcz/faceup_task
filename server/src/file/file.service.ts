import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFileInput } from './dto/create-file.input';
import { InjectRepository } from '@nestjs/typeorm';
import { File } from './entities/file.entity';
import { DataSource, In, QueryRunner, Repository } from 'typeorm';
import { FilesAndCount } from './dto/files.output';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File)
    private filesRepository: Repository<File>,
    private dataSource: DataSource,
  ) {}

  async create(createFileInput: CreateFileInput): Promise<File> {
    let savedFile: File;
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const record = queryRunner.manager.create(File, createFileInput);
      savedFile = await this.filesRepository.save(record);
      await queryRunner.commitTransaction();
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw e;
    } finally {
      await queryRunner.release();
    }
    return savedFile;
  }

  findAll() {
    return `This action returns all file`;
  }

  async findOne(id: number): Promise<File> {
    const file = await this.filesRepository.findOne({ where: { id } });

    if (!file) {
      throw new NotFoundException(
        `File with id: "${id}" doees not exist in database.`,
      );
    }

    return file;
  }

  async findByRecord(recordId: number): Promise<FilesAndCount> {
    const filesAndCount = await this.filesRepository.findAndCount({
      where: { recordId },
      order: {
        created_at: 'DESC',
      },
    });

    return {
      totalNumber: filesAndCount[1],
      files: filesAndCount[0],
    };
  }

  async removeFiles(id: number[], queryRunner: QueryRunner): Promise<void> {
    const fileToDelete = await this.filesRepository.find({
      where: { id: In(id) },
    });

    await queryRunner.manager.remove(fileToDelete);
  }
}
