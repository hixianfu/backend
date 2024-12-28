import { Controller, Get, Query } from '@nestjs/common';
import { CourseService } from './course.service';
import { ApiOperation, ApiProperty, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CourseLevel } from './entities/course.entity';

@Controller('course')
@ApiTags('课程')
export class CourseController {
  constructor(private readonly courseService: CourseService) { }

  @Get()
  @ApiOperation({ summary: '获取课程列表' })
  @ApiQuery({ name: 'level', enum: CourseLevel, required: false })
  findAll(
    @Query('level') level: CourseLevel
  ) {
    return this.courseService.findAll(level);
  }

}
