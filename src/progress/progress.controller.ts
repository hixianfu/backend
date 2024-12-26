import { Controller, Patch, Body } from '@nestjs/common';
import { ProgressService } from './progress.service';
import { UpdateProgressDto } from './dto/update-progress.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@Controller('progress')
@ApiTags('用户单词进度')
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  @Patch()
  @ApiOperation({ summary: '更新单词进度' })
  update(@Body() updateProgressDto: UpdateProgressDto) {
    return this.progressService.update(updateProgressDto);
  }

}
