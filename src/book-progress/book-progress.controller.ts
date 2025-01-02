import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { BookProgressService } from './book-progress.service';
import { CreateBookProgressDto } from './dto/create-book-progress.dto';
import { UpdateBookProgressDto } from './dto/update-book-progress.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('book-progress')
@ApiTags('用户关卡进度')
export class BookProgressController {
  constructor(private readonly bookProgressService: BookProgressService) {}

  @Post()
  @ApiOperation({ summary: '创建用户进度' })
  create(@Body() createBookProgressDto: CreateBookProgressDto) {
    return this.bookProgressService.create(createBookProgressDto);
  }

  @Get('book/user')
  @ApiOperation({ summary: '获取用户题本进度' })
  findAllByBookIdAndUserId(
    @Query('bookId') bookId: number,
    @Query('userId') userId: number,
  ) {
    return this.bookProgressService.findAllByBookIdAndUserId(bookId, userId);
  }

  @Get()
  findAll() {
    return this.bookProgressService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookProgressService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookProgressDto: UpdateBookProgressDto) {
    return this.bookProgressService.update(+id, updateBookProgressDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookProgressService.remove(+id);
  }
}
