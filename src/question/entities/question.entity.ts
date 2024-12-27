import { ApiProperty } from "@nestjs/swagger";
import { Course } from "src/course/entities/course.entity";
import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from "typeorm";

export enum QuestionType {
    DAILY = 'daily',         // 日常
    BUSINESS = 'business',   // 商务
    IDOMS = 'idoms',         // 习惯用语
    TRAVEL = 'travel',       // 旅游
    TECHNICAL = 'technical', // 技术
    OTHER = 'other'          // 其他
}

@Entity('quiz_questions')
export class Question {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'enum', enum: QuestionType, default: QuestionType.DAILY, comment: 'daily: 日常用语; business: 商务; idoms: 习惯用语; travel: 旅游; technical: 技术; other: 其他' })
    @ApiProperty({ description: '题目类型' })
    type: QuestionType;

    @Column()
    question: string;

    @Column({ type: 'json' })
    @ApiProperty({ description: '选项' })
    options: string[];

    @Column()
    @ApiProperty({ description: '正确答案' })
    correct_answer: string;

    @ManyToOne(() => Course, course => course.id)
    @JoinColumn({ name: 'courseId' })
    @ApiProperty({ description: '课程ID' })
    courseId: number

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    @ApiProperty({ description: '创建时间' })
    created_at: Date;

    @Column({ type: 'timestamp', default: null, onUpdate: 'CURRENT_TIMESTAMP' })
    @ApiProperty({ description: '更新时间' })
    updated_at: Date;
}
