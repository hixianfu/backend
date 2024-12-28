import { ApiProperty } from "@nestjs/swagger";

export class CreateAnswerDto {
    @ApiProperty({ description: '用户ID' })
    userId: number;

    @ApiProperty({ description: '题目ID' })
    questionId: number;

    @ApiProperty({ description: '课程ID' })
    courseId: number;

    @ApiProperty({ description: '用户答案' })
    userAnswer: string;

    @ApiProperty({ description: '正确答案' })
    correctAnswer: string;

    @ApiProperty({ description: '是否正确' })
    isCorrect: number;
}
