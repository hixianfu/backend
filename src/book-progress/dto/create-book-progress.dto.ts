import { ApiProperty } from "@nestjs/swagger";

export class CreateBookProgressDto {
    @ApiProperty({ description: '用户ID' })
    userId: number;

    @ApiProperty({ description: '题本ID' })
    bookId: number;

    @ApiProperty({ description: '关卡ID' })
    levelId: number;

    @ApiProperty({ description: '得分' })
    score: number;

    @ApiProperty({ description: '是否完成 0: 未完成 1: 已完成' })
    completed: number;

    @ApiProperty({ description: '完成时间' })
    completedAt: number;
}
