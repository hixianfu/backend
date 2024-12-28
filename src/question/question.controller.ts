import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { ApiBody, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { QuestionType } from './entities/question.entity';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) { }

  @Post()
  @ApiOperation({ summary: '创建题目' })
  @ApiBody({ type: CreateQuestionDto })
  create(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionService.create(createQuestionDto);
  }

  @Get('daily')
  @ApiOperation({ summary: '获取日常题目' })
  @ApiQuery({ name: 'count', type: Number, required: false, description: '题目数量', default: 10 })
  @ApiQuery({ name: 'type', type: String, required: false, description: '题目类型', default: QuestionType.DAILY })
  @ApiQuery({ name: 'courseId', type: Number, required: false, description: '课程id' })
  findDailyQuiz(
    @Query('count') count: number = 10,
    @Query('type') type: QuestionType = QuestionType.DAILY,
    @Query('courseId') courseId: number
  ) {
    return this.questionService.findDailyQuiz(count, type, courseId);
  }

  @Get('wrong')
  @ApiOperation({ summary: '获取用户错题' })
  @ApiQuery({ name: 'userId', type: Number, required: true, description: '用户id' })
  @ApiQuery({ name: 'courseId', type: Number, required: true, description: '课程id' })
  findUserWrongAnswer(@Query('userId') userId: number, @Query('courseId') courseId: number) {
    return this.questionService.findWrongQuiz(userId, courseId);
  }
}
