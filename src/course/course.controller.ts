import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { ApiOperation, ApiProperty } from '@nestjs/swagger';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) { }

  @Get()
  findAll() {
    return this.courseService.findAll();
  }

}
