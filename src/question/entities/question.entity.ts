import { ApiProperty } from "@nestjs/swagger";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

export enum QuestionType {
    DAILY = 'daily',         // 日常
    BUSINESS = 'business',   // 商务
    IDOMS = 'idoms',         // 习惯用语
    TRAVEL = 'travel',       // 旅游
    TECHNICAL = 'technical', // 技术
    OTHER = 'other'          // 其他
}

export enum QuizType {
    SINGLE = 'single', // 单选
    MULTIPLE = 'multiple', // 多选
    TRUE_FALSE = 'true_false', // 判断
    FILL_IN_THE_BLANK = 'fill_in_the_blank', // 填空
}

@Entity('quiz_questions')
export class Question {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int', comment: '关卡id', nullable: false })
    levelId: number

    @Column({ type: 'enum', enum: QuestionType, default: QuestionType.DAILY, comment: 'daily: 日常用语; business: 商务; idoms: 习惯用语; travel: 旅游; technical: 技术; other: 其他' })
    @ApiProperty({ description: '题目类型' })
    type: QuestionType;

    @Column({ type: 'enum', enum: QuizType, default: QuizType.SINGLE, comment: '单选; 多选; 判断; 填空' })
    @ApiProperty({ description: '题目类型' })
    quizType: QuizType;

    @Column({ type: 'text', comment: '题目' })
    question: string;

    @Column({ type: 'json', comment: '选项' })
    @ApiProperty({ description: '选项' })
    options: string[];

    @Column({ type: 'text', comment: '正确答案' })
    @ApiProperty({ description: '正确答案' })
    correctAnswer: string;

    @Column({ type: 'tinyint',  default: 1, comment: '是否激活, 1: 激活, 0: 不激活' })
    @ApiProperty({ description: '是否激活' })
    isActive: number;

    @Column({ type: 'int', comment: '该题的分数', nullable: true })
    @ApiProperty({ description: '该题的分数' })
    points: number

    @Column({ type: 'int', comment: '修改人id', nullable: true })
    @ApiProperty({ description: '修改人id' })
    modified_by: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    @ApiProperty({ description: '创建时间' })
    created_at: Date;

    @Column({ type: 'timestamp', default: null, onUpdate: 'CURRENT_TIMESTAMP' })
    @ApiProperty({ description: '更新时间' })
    updated_at: Date;
}
