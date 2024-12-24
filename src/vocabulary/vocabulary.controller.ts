import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VocabularyService } from './vocabulary.service';
import { CreateVocabularyDto } from './dto/create-vocabulary.dto';
import { UpdateVocabularyDto } from './dto/update-vocabulary.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@Controller('vocabulary')
@ApiTags('词汇本')
export class VocabularyController {
  constructor(private readonly vocabularyService: VocabularyService) {}

  @Post()
  @ApiOperation({ summary: '创建词汇本' })
  create(@Body() createVocabularyDto: CreateVocabularyDto) {
    return this.vocabularyService.create(createVocabularyDto);
  }

  @Get()
  @ApiOperation({ summary: '获取词汇本列表' })
  findAll() {
    return this.vocabularyService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: '获取词汇本' })
  findOne(@Param('id') id: string) {
    return this.vocabularyService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '更新词汇本' })
  update(@Param('id') id: string, @Body() updateVocabularyDto: UpdateVocabularyDto) {
    return this.vocabularyService.update(+id, updateVocabularyDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除词汇本' })
  remove(@Param('id') id: string) {
    return this.vocabularyService.remove(+id);
  }
}
