import { Injectable } from '@nestjs/common';
import { CreateBookProgressDto } from './dto/create-book-progress.dto';
import { UpdateBookProgressDto } from './dto/update-book-progress.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookProgress } from './entities/book-progress.entity';

@Injectable()
export class BookProgressService {
  constructor(
    @InjectRepository(BookProgress)
    private readonly bookProgressRepository: Repository<BookProgress>,
  ) {}
  
  create(createBookProgressDto: CreateBookProgressDto) {
    return this.bookProgressRepository.save(createBookProgressDto);
  }

  findAll() {
    return this.bookProgressRepository.find();
  }

  findOne(id: number) {
    return this.bookProgressRepository.findOne({ where: { id } });
  }

  update(id: number, updateBookProgressDto: UpdateBookProgressDto) {
    return this.bookProgressRepository.update(id, updateBookProgressDto);
  }

  remove(id: number) {
    return this.bookProgressRepository.delete(id);
  }
}
