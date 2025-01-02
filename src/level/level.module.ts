import { Module } from '@nestjs/common';
import { LevelService } from './level.service';
import { LevelController } from './level.controller';
import { Level } from './entities/level.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookProgressModule } from 'src/book-progress/book-progress.module';

@Module({
  imports: [TypeOrmModule.forFeature([Level]), BookProgressModule], 
  controllers: [LevelController],
  providers: [LevelService],
  exports: [LevelService],
})
export class LevelModule {}
