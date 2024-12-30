import { Controller, Post, Body } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('answer')
@ApiTags('答题记录')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Post()
  @ApiOperation({ summary: '创建答题记录' })
  create(@Body() createAnswerDto: CreateAnswerDto) {
    return this.answerService.create(createAnswerDto);
  }
}
