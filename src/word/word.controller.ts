import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { WordService } from './word.service';
import { CreateWordDto } from './dto/create-word.dto';
import { UpdateWordDto } from './dto/update-word.dto';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@Controller('word')
@ApiTags('CET4单词')
export class WordController {
  constructor(private readonly wordService: WordService) {}

  @Post()
  create(@Body() createWordDto: CreateWordDto) {
    return this.wordService.create(createWordDto);
  }

  @Get('cet4/daily')
  @ApiOperation({ summary: '获取每日单词' })
  @ApiQuery({ name: 'id', type: Number, required: true, description: '用户id' })
  findDaily(@Query('id') userId: number) {
    return this.wordService.findDaily(userId);
  }

  @Get('cet4/all')
  @ApiOperation({ summary: '获取所有CET4单词' })
  findAllCet4(@Query('id') userId: number) {
    return this.wordService.findAllCet4(userId);
  }

  @Get('cet4/:word')
  @ApiOperation({ summary: '搜索单词' })
  findOne(@Param('word') word: string) {
    return this.wordService.findOne(word);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWordDto: UpdateWordDto) {
    return this.wordService.update(+id, updateWordDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.wordService.remove(+id);
  }
}
