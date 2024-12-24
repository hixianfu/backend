import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength, MaxLength, IsOptional } from 'class-validator';

export class CreateVocabularyDto {
  @ApiProperty({ description: '词汇本名称' })
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  name: string;

  @ApiProperty({ description: '词汇本描述' })
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  description: string;

  @ApiProperty({ description: '词汇本封面' })
  @IsOptional()
  @IsString()
  cover: string;
}
