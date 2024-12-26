import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProgressDto } from './dto/create-progress.dto';
import { UpdateProgressDto } from './dto/update-progress.dto';
import { Repository } from 'typeorm';
import { Progress, ProgressStatus } from './entities/progress.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { dayjsNow, nowAfterThreeDays } from 'src/utils/userDayJS';

@Injectable()
export class ProgressService {

  constructor(
    @InjectRepository(Progress)
    private progressRepository: Repository<Progress>,
  ) { }

  create(createProgressDto: CreateProgressDto) {
    return this.progressRepository.save(createProgressDto);
  }

  async findLearnedWords(userId: number) {
    const learnedWords = await this.progressRepository.createQueryBuilder('user_word_progress')
      .leftJoinAndSelect('user_word_progress.userId', 'user')
      .leftJoinAndSelect('user_word_progress.wordId', 'word')
      .where('user_word_progress.userId = :userId', { userId })
      .getMany();
    return learnedWords;
  }

  async update(updateProgressDto: UpdateProgressDto) {
    const progress = await this.progressRepository.createQueryBuilder('user_word_progress')
      .select()
      .where('user_word_progress.userId = :userId and user_word_progress.wordId = :wordId', { userId: updateProgressDto.userId, wordId: updateProgressDto.wordId })
      .getOne();
    console.log(progress, 'progress');
    if (!progress) {
      throw new NotFoundException('Progress not found');
    }

    const { status } = updateProgressDto;
    progress.status = status;

    if (status === ProgressStatus.LEARNED) {
      progress.nextReviewTime = null;
    } else {
      progress.nextReviewTime = nowAfterThreeDays();
    }

    return this.progressRepository.save(progress);
  }
}
