import { Injectable } from '@nestjs/common';
import { CreateVocabularyDto } from './dto/create-vocabulary.dto';
import { UpdateVocabularyDto } from './dto/update-vocabulary.dto';
import { Vocabulary } from './entities/vocabulary.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class VocabularyService {

  constructor(
    @InjectRepository(Vocabulary)
    private readonly vocabularyRepository: Repository<Vocabulary>,
  ) {}

  async create(createVocabularyDto: CreateVocabularyDto) {
    return await this.vocabularyRepository.save(createVocabularyDto);
  }

  async findAll() {
    return await this.vocabularyRepository.find();
  }

  async findOne(id: number) {
    return await this.vocabularyRepository.findOne({ where: { id } });
  }

  async update(id: number, updateVocabularyDto: UpdateVocabularyDto) {
    return await this.vocabularyRepository.update(id, updateVocabularyDto);
  }

  async remove(id: number) {
    return await this.vocabularyRepository.delete(id);
  }
}
