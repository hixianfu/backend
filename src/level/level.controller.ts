import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { LevelService } from './level.service';
import { CreateLevelDto } from './dto/create-level.dto';
import { UpdateLevelDto } from './dto/update-level.dto';
import { ApiOperation, ApiTags, ApiBody } from '@nestjs/swagger';

@Controller('level')
@ApiTags('关卡')
export class LevelController {
  constructor(private readonly levelService: LevelService) { }

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

  @Get('detail')
  @ApiOperation({ summary: '根据关卡id获取关卡' })
  findLevelById(
    @Query('levelId') levelId: number
  ) {
    return this.levelService.findLevelById(levelId);
  }


  @Get('book/user')
  @ApiOperation({ summary: '获取题本所有关卡' })
  findByBookId(
    @Query('bookId') bookId: number,
    @Query('userId') userId: number,
  ) {
    return this.levelService.findByBookId(bookId, userId);
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
