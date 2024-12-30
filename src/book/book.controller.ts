import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { BookDifficulty } from './entities/book.entity';

@Controller('book')
@ApiTags('题本')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @ApiOperation({ summary: '创建题本' })
  @ApiBody({ type: CreateBookDto })
  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  @Get()
  @ApiOperation({ summary: '查询所有题本' })
  findAll() {
    return this.bookService.findAll();
  }

  @Get('difficulty')
  @ApiOperation({ summary: '根据难度查询题本' })
  @ApiQuery({ name: 'difficulty', enum: BookDifficulty, required: false })
  @ApiQuery({ name: 'isActive', type: Number, required: false, description: '是否激活 0: 不激活 1: 激活' })
  findByDifficulty(
    @Query('difficulty') difficulty: BookDifficulty,
    @Query('isActive') isActive: number
  ) {
    return this.bookService.findByDifficulty(difficulty, isActive);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookService.findOne(+id);
  } 

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(+id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookService.remove(+id);
  }
}
