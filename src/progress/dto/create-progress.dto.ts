import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { ProgressStatus } from "../entities/progress.entity";

export class CreateProgressDto {
    @IsNotEmpty()
    @ApiProperty({ description: '用户ID' })
    userId: number;

    @IsNotEmpty()
    @ApiProperty({ description: '单词ID' })
    wordId: number;

    @IsNotEmpty()
    @ApiProperty({ description: '进度状态' })
    status: ProgressStatus;

    @IsNotEmpty()
    @ApiProperty({ description: '下次复习时间' })
    nextReviewTime: Date;
}
