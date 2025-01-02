import { ApiProperty } from "@nestjs/swagger";
import { QuestionType, QuizType } from "../entities/question.entity";
import { IsNotEmpty } from "class-validator";

export class CreateQuestionDto {

    @ApiProperty({ description: '类型' })
    type: QuestionType;

    @ApiProperty({ description: '题目类型' })
    quizType: QuizType;

    @ApiProperty({ description: '题目' })
    question: string;

    @ApiProperty({ description: '选项' })
    options: string[];

    @ApiProperty({ description: '正确答案' })
    correctAnswer: string;

    @IsNotEmpty()
    @ApiProperty({ description: '关卡ID' })
    levelId: number;

    @ApiProperty({ description: '该题的分数' })
    points: number

    @ApiProperty({ description: '是否激活' })
    isActive: number;
}
