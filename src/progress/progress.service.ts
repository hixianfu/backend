import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProgressDto } from './dto/create-progress.dto';
import { UpdateProgressDto } from './dto/update-progress.dto';
import { Repository } from 'typeorm';
import { Progress, ProgressStatus } from './entities/progress.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { nowAfterThreeDays } from 'src/utils/userDayJS';
import { ActivityService } from 'src/activity/activity.service';
import { ActivityType } from 'src/activity/entities/activity.entity';

@Injectable()
export class ProgressService {

  constructor(
    @InjectRepository(Progress)
    private progressRepository: Repository<Progress>,
    private activityService: ActivityService, 
  ) { }

  /**
   * 创建单词进度
   * @param createProgressDto 
   * @returns 
   */
  create(createProgressDto: CreateProgressDto) {
    return this.progressRepository.save(createProgressDto);
  }

  /**
   * 获取已学会的单词
   * @param userId 用户ID
   * @returns 
   */
  async findLearnedWords(userId: number) {
    const learnedWords = await this.progressRepository.createQueryBuilder('user_word_progress')
      .where('userId = :userId', { userId })
      .getMany();
    return learnedWords;
  }

  /**
   * 更新单词进度
   * @param updateProgressDto 
   * @returns 
   */
  async update(updateProgressDto: UpdateProgressDto) {
    const progress = await this.progressRepository.createQueryBuilder('user_word_progress')
      .select()
      .where('user_word_progress.userId = :userId and user_word_progress.wordId = :wordId', { userId: updateProgressDto.userId, wordId: updateProgressDto.wordId })
      .getOne();
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

  /**
   * 获取用户学习情况
   * @param userId 用户ID
   * @returns 
   */
  async findCet4Progress(userId: number) {
    const sql = `
      SELECT status
      FROM user_word_progress
      WHERE userId = ${userId}
    `;

    const count_sql = `
      SELECT COUNT(*) AS count
      FROM wine_cet4_word
    `;

    const progress: { status: ProgressStatus }[] = await this.progressRepository.query(sql);
    const count: { count: number }[] = await this.progressRepository.query(count_sql);

    let word_count = 0;
    let time_count = 0;

    const activity = await this.activityService.findTodayAllByUserId(userId);
    activity.map(a => {
      if(a.activityType === ActivityType.WORD) {
        word_count += a.activityValue;
      }
      if(a.activityType === ActivityType.TIME) {
        time_count += a.activityValue;
      }
    })

    return {
      learned: progress.filter(p => p.status == ProgressStatus.LEARNED).length,
      familiar: progress.filter(p => p.status == ProgressStatus.FAMILIAR).length,
      forgotten: progress.filter(p => p.status == ProgressStatus.FORGOT).length,
      word: word_count,
      time: time_count > 0 ? (time_count / 60).toFixed(2) : 0,
      total: count[0].count,
    };
  }
}
