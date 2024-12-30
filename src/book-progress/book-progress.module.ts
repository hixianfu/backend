import { Module } from '@nestjs/common';
import { BookProgressService } from './book-progress.service';
import { BookProgressController } from './book-progress.controller';
import { BookProgress } from './entities/book-progress.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([BookProgress])],  
  controllers: [BookProgressController],
  providers: [BookProgressService],
})
export class BookProgressModule {}
