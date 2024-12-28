import { Injectable } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { Repository } from 'typeorm';
import { Answer } from './entities/answer.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(Answer)
    private readonly answerRepository: Repository<Answer>,
  ) { }

  create(createAnswerDto: CreateAnswerDto) {
    return this.answerRepository.save(createAnswerDto);
  }
  
}
