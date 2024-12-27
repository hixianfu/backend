import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Question, QuestionType } from './entities/question.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>
  ){}

  create(createQuestionDto: CreateQuestionDto) {
    return this.questionRepository.save(createQuestionDto);
  }

  /**
   * 获取日常题目
   * @param count 题目数量
   * @param type 题目类型
   * @returns 题目列表
   */
  async findDailyQuiz(count: number, type: QuestionType) {
    return await this.questionRepository.createQueryBuilder('quiz_questions')
      .select()
      .where('type = :type', { type })
      .orderBy('RAND()')
      .limit(count)
      .getMany();
  }
}
