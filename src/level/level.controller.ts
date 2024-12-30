import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LevelService } from './level.service';
import { CreateLevelDto } from './dto/create-level.dto';
import { UpdateLevelDto } from './dto/update-level.dto';
import { ApiOperation, ApiTags, ApiBody } from '@nestjs/swagger';

@Controller('level')
@ApiTags('关卡')
export class LevelController {
  constructor(private readonly levelService: LevelService) {}

  @Post()
  @ApiOperation({ summary: '创建关卡' })
  @ApiBody({ type: CreateLevelDto })
  create(@Body() createLevelDto: CreateLevelDto) {
    return this.levelService.create(createLevelDto);
  }

  @Get()
  @ApiOperation({ summary: '获取所有关卡' })
  findAll() {
    return this.levelService.findAll();
  }

  @Get('book/:bookId')
  @ApiOperation({ summary: '获取题本所有关卡' })
  findByBookId(@Param('bookId') bookId: string) {
    return this.levelService.findByBookId(+bookId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLevelDto: UpdateLevelDto) {
    return this.levelService.update(+id, updateLevelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.levelService.remove(+id);
  }
}
