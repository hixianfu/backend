import { ApiProperty } from "@nestjs/swagger";
import { QuestionType } from "../entities/question.entity";

export class CreateQuestionDto {

    @ApiProperty({ description: '类型' })
    type: QuestionType;

    @ApiProperty({ description: '题目' })
    question: string;

    @ApiProperty({ description: '选项' })
    options: string[];

    @ApiProperty({ description: '正确答案' })
    correct_answer: string;     
}
