import { Injectable } from '@nestjs/common';
import { CreateWordDto } from './dto/create-word.dto';
import { UpdateWordDto } from './dto/update-word.dto';
import { Word } from './entities/word.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProgressService } from 'src/progress/progress.service';
import { Progress, ProgressStatus } from 'src/progress/entities/progress.entity';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { Redis } from 'ioredis';
import { nowAfterThreeDays } from 'src/utils/userDayJS';

@Injectable()
export class WordService {

  constructor(
    @InjectRepository(Word)
    private readonly wordRepository: Repository<Word>,
    @InjectRedis()
    private readonly redis: Redis,
    private readonly progressService: ProgressService,
  ) { }

  private readonly redisPrefix = 'wordz:daily_words'

  create(createWordDto: CreateWordDto) {
    return 'This action adds a new word';
  }

  /**
   * 获取每日单词, 随机20个单词
   * @returns 
   */
  async findDaily(userId: number) {
    const redisKey = `${this.redisPrefix}:${userId}`;
    let words: Word[] = [];

    const cachedWords = await this.redis.get(redisKey);
    if (cachedWords) {
      return JSON.parse(cachedWords);
    }

    // 获取用户已学单词
    const learnedWords = await this.progressService.findLearnedWords(userId);

    // 判断是否有今天要复习的单词
    const today = new Date().toISOString().split('T')[0];
    const todayReviewWords = learnedWords.filter(word =>
      new Date(word.nextReviewTime).toISOString().split('T')[0] === today
    );

    if (todayReviewWords.length === 0) {
      words = await this.wordRepository.createQueryBuilder('word')
        .select()
        .orderBy('RAND()')
        .limit(20)
        .getMany();

      words.forEach(word => {
        this.progressService.create({
          userId: userId,
          wordId: word.id,
          status: ProgressStatus.FORGOT,
          nextReviewTime: nowAfterThreeDays()
        });
      });
    } else {
      words = await this.findBatch(todayReviewWords);

      if (words.length < 20) {
        const newWords = await this.wordRepository.createQueryBuilder('word')
          .select()
          .orderBy('RAND()')
          .limit(20 - words.length)
          .getMany();
        words = [...words, ...newWords];
      }
    }

    const now = new Date(); // 获取当前时间
    const tomorrow = new Date(now);
    tomorrow.setHours(8, 0, 0, 0); // 设置明天的 8 点钟

    if (now > tomorrow) {
      tomorrow.setDate(tomorrow.getDate() + 1);
    }

    const differenceInMilliseconds = tomorrow.getTime() - now.getTime(); // 计算时间差，单位是毫秒
    const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000);


    await this.redis.set(redisKey, JSON.stringify(words), 'EX', differenceInSeconds);

    return words;
  }

  async findBatch(progress: Progress[]) {
    return this.wordRepository.createQueryBuilder('word')
      .select()
      .where('word.id IN (:...ids)', { ids: progress.map((p: any) => (p.wordId as Word).id) })
      .getMany();
  }

  findOne(word: string): Promise<Word> {
    return this.wordRepository.findOne({ where: { cet4_word: word } });
  }

  update(id: number, updateWordDto: UpdateWordDto) {
    return `This action updates a #${id} word`;
  }

  remove(id: number) {
    return `This action removes a #${id} word`;
  }
}
