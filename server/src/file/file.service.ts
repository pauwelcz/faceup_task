import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFileInput } from './dto/create-file.input';
import { InjectRepository } from '@nestjs/typeorm';
import { File } from './entities/file.entity';
import { DataSource, In, QueryRunner, Repository } from 'typeorm';
import { FilesAndCount } from './dto/files.output';
import {
  CreateBucketCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { Readable } from 'stream';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class FileService {
  private readonly s3Client = new S3Client({
    endpoint: 'http://127.0.0.1:4566',
    region: 'us-west-1',
    forcePathStyle: true,
    credentials: {
      accessKeyId: 'testkey',
      secretAccessKey: 'testsecret',
    },
  });

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

  async findOne(id: number): Promise<string> {
    const file = await this.filesRepository.findOne({ where: { id } });

    if (!file) {
      throw new NotFoundException(
        `File with id: "${id}" doees not exist in database.`,
      );
    }

    const url = await getSignedUrl(
      this.s3Client,
      new GetObjectCommand({
        Key: file.filename,
        Bucket: 'testBucket',
      }),
      { expiresIn: 3600 },
    );

    return url;
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

  async saveFiles(recordId: number, queryRunner: QueryRunner, files: any) {
    const filesToCreateDB = [];

    try {
      await this.s3Client.send(
        new CreateBucketCommand({
          Bucket: 'testbucket',
        }),
      );
    } catch (e) {}

    await Promise.all(
      files.map(async (file: any) => {
        const { createReadStream, filename, mimetype } = await file;
        const newFilename = `${new Date().valueOf()}_${filename}`;

        // sending to s3
        const buffer = await this.streamToBuffer(createReadStream());
        await this.s3Client.send(
          new PutObjectCommand({
            Body: buffer,
            ContentType: mimetype,
            Key: newFilename,
            Bucket: 'testbucket',
          }),
        );

        // sending to database
        filesToCreateDB.push(
          queryRunner.manager.create(File, {
            extension: '',
            filename: newFilename,
            recordId,
          }),
        );
      }),
    );

    await queryRunner.manager.save(File, filesToCreateDB);
  }

  async uploadSingleToCloudinaryGraphql(args: any) {
    const { createReadStream } = await args.file;
    const buffer = await this.streamToBuffer(createReadStream());

    return buffer;
  }

  async streamToBuffer(stream: Readable): Promise<Buffer> {
    const buffer: Uint8Array[] = [];

    return new Promise((resolve, reject) =>
      stream
        .on('error', (error) => reject(error))
        .on('data', (data) => buffer.push(data))
        .on('end', () => resolve(Buffer.concat(buffer))),
    );
  }
}
