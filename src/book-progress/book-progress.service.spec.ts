import { Test, TestingModule } from '@nestjs/testing';
import { BookProgressService } from './book-progress.service';

describe('BookProgressService', () => {
  let service: BookProgressService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookProgressService],
    }).compile();

    service = module.get<BookProgressService>(BookProgressService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
