import { Controller, Patch, Body, Query, Get } from '@nestjs/common';
import { ProgressService } from './progress.service';
import { UpdateProgressDto } from './dto/update-progress.dto';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';

@Controller('progress')
@ApiTags('用户单词进度')
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  @Patch()
  @ApiOperation({ summary: '更新单词进度' })
  update(@Body() updateProgressDto: UpdateProgressDto) {
    return this.progressService.update(updateProgressDto);
  }

  @Get('cet4/learned')
  @ApiOperation({ summary: '获取用户学习情况' })
  @ApiQuery({ name: 'id', type: Number, required: true, description: '用户id' })
  findCet4Progress(@Query('id') userId: number): Promise<{ learned: number, familiar: number, forgotten: number, total: number }> {
    return this.progressService.findCet4Progress(userId);
  }

}
