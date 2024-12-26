import { Module } from '@nestjs/common';
import { WordService } from './word.service';
import { WordController } from './word.controller';
import { Word } from './entities/word.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgressModule } from 'src/progress/progress.module';

@Module({
  imports: [TypeOrmModule.forFeature([Word]), ProgressModule],
  controllers: [WordController],
  providers: [WordService],
})
export class WordModule {}
