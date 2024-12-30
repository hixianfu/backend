import { Test, TestingModule } from '@nestjs/testing';
import { BookProgressController } from './book-progress.controller';
import { BookProgressService } from './book-progress.service';

describe('BookProgressController', () => {
  let controller: BookProgressController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookProgressController],
      providers: [BookProgressService],
    }).compile();

    controller = module.get<BookProgressController>(BookProgressController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
