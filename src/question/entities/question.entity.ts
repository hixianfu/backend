import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

export enum QuestionType {
    DAILY = 'daily',         // 日常
    BUSINESS = 'business',   // 商务
    IDOMS = 'idoms',         // 习惯用语
    TRAVEL = 'travel',       // 旅游
    TECHNICAL = 'technical', // 技术
    OTHER = 'other'          // 其他
}

export enum QuizLevel {
    ZERO = '0', // 零基础
    BEGINNER = '1', // 初级
    INTERMEDIATE = '2', // 中级
    ADVANCED = '3' // 高级
}

@Entity('quiz_questions')
export class Question {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'enum', enum: QuestionType, default: QuestionType.DAILY, comment: 'daily: 日常用语; business: 商务; idoms: 习惯用语; travel: 旅游; technical: 技术; other: 其他' })
    type: QuestionType;

    @Column({ type: 'simple-enum', default: QuizLevel.ZERO, comment: '0: 零基础; 1: 初级; 2: 中级; 3: 高级' })
    level: QuizLevel

    @Column()
    question: string;

    @Column({ type: 'json' })
    options: string[];

    @Column()
    correct_answer: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ type: 'timestamp', default: null, onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: Date;
}
