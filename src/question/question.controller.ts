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
  findDailyQuiz(
    @Query('count') count: number = 10,
    @Query('type') type: QuestionType = QuestionType.DAILY
  ) {
    return this.questionService.findDailyQuiz(count, type);
  }
}
