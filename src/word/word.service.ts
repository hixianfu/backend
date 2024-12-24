import { Injectable } from '@nestjs/common';
import { CreateWordDto } from './dto/create-word.dto';
import { UpdateWordDto } from './dto/update-word.dto';
import { Word } from './entities/word.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class WordService {

  constructor(
    @InjectRepository(Word)
    private readonly wordRepository: Repository<Word>,
  ) {}

  create(createWordDto: CreateWordDto) {
    return 'This action adds a new word';
  }

  /**
   * 获取每日单词, 随机20个单词
   * @returns 
   */
    findDaily() {
      const words = this.wordRepository.createQueryBuilder('word')
      .select()
      .orderBy('RAND()')
      .limit(20)
      .getMany();

      return words;
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
