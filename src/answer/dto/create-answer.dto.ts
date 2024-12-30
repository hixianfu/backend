import { ApiProperty } from "@nestjs/swagger";

export class CreateAnswerDto {
    @ApiProperty({ description: '用户ID' })
    userId: number;

    @ApiProperty({ description: '题目ID' })
    questionId: number;

    @ApiProperty({ description: '用户答案' })
    userAnswer: JSON;

    @ApiProperty({ description: '是否正确' })
    isCorrect: number;

    @ApiProperty({ description: '得分' })
    pointEarned: number;
}
