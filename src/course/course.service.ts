import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course, CourseLevel } from './entities/course.entity';

@Injectable()
export class CourseService {

  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>
  ){}

  findAll(level: CourseLevel) {
    return this.courseRepository.find({
      where: {
        level: level
      }
    })
  }
}
