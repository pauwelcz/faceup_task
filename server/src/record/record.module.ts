import { Module } from '@nestjs/common';
import { RecordService } from './record.service';
import { RecordResolver } from './record.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Record } from './entities/record.entity';
import { FileModule } from '../file/file.module';

@Module({
  imports: [TypeOrmModule.forFeature([Record]), FileModule],
  providers: [RecordResolver, RecordService],
})
export class RecordModule {}
