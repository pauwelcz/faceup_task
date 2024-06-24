import { Module } from '@nestjs/common';
import { RecordService } from './record.service';
import { RecordResolver } from './record.resolver';

@Module({
  providers: [RecordResolver, RecordService],
})
export class RecordModule {}
