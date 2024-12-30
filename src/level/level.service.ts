import { Injectable } from '@nestjs/common';
import { CreateLevelDto } from './dto/create-level.dto';
import { UpdateLevelDto } from './dto/update-level.dto';
import { Level } from './entities/level.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class LevelService {

  constructor(
    @InjectRepository(Level)
    private readonly levelRepository: Repository<Level>,
  ) {}  

  create(createLevelDto: CreateLevelDto) {
    return this.levelRepository.save(createLevelDto);
  }

  findByBookId(bookId: number) {
    return this.levelRepository.find({ where: { bookId } });
  }

  findAll() {
    return this.levelRepository.find();
  }

  findOne(id: number) {
    return this.levelRepository.findOne({ where: { id } });
  }

  update(id: number, updateLevelDto: UpdateLevelDto) {
    return `This action updates a #${id} level`;
  }

  remove(id: number) {
    return `This action removes a #${id} level`;
  }
}
