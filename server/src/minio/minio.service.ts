import { Injectable } from '@nestjs/common';
import * as Minio from 'minio';

@Injectable()
export class MinioService {
  private readonly minioClient: Minio.Client;

  constructor() {
    this.minioClient = new Minio.Client({
      endPoint: 'localhost',
      port: 9000,
      useSSL: false,
      accessKey: 'minio_access_key',
      secretKey: 'minio_secret_key',
    });
  }

  public getMinioClient(): Minio.Client {
    return this.minioClient;
  }
}
