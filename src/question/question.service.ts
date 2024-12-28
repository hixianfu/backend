import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Question, QuestionType } from './entities/question.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>
  ) { }

  create(createQuestionDto: CreateQuestionDto) {
    return this.questionRepository.save(createQuestionDto);
  }

  /**
   * 获取日常题目
   * @param count 题目数量
   * @param type 题目类型
   * @returns 题目列表
   */
  async findDailyQuiz(count: number, type: QuestionType, courseId: number) {
    return await this.questionRepository.createQueryBuilder('quiz_questions')
      .select()
      .where('type = :type and courseId = :courseId', { type, courseId })
      .orderBy('RAND()')
      .limit(count)
      .getMany();
  }

  async findWrongQuiz(userId: number, courseId: number) {
    return await this.questionRepository
      .createQueryBuilder('q')
      .select(['q.*', 'u.userAnswer as userAnswer'])
      .innerJoin('quiz_user_answer', 'u', 'q.id = u.questionId')
      .where('q.courseId = :courseId', { courseId })
      .andWhere('u.userId = :userId', { userId })
      .andWhere('u.courseId = :courseId', { courseId })
      .andWhere('u.isCorrect = :isCorrect', { isCorrect: 0 })
      .getRawMany();
  }
}
