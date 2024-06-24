import { Test, TestingModule } from '@nestjs/testing';
import { RecordResolver } from './record.resolver';
import { RecordService } from './record.service';

describe('RecordResolver', () => {
  let resolver: RecordResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecordResolver, RecordService],
    }).compile();

    resolver = module.get<RecordResolver>(RecordResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
