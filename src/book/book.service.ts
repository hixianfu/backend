import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Book, BookDifficulty } from './entities/book.entity';

@Injectable()
export class BookService {

  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) { }

  create(createBookDto: CreateBookDto) {
    return this.bookRepository.save(createBookDto);
  }

  findAll() {
    return this.bookRepository.find();
  }

  findByDifficulty(difficulty: BookDifficulty, isActive: number) {
    return this.bookRepository.find({ where: { difficulty, isActive } });
  }

  findOne(id: number) {
    return this.bookRepository.findOne({ where: { id } });
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return this.bookRepository.update(id, updateBookDto);
  }

  remove(id: number) {
    return this.bookRepository.delete(id);
  }
}
