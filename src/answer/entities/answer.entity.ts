import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('user_answer')
export class Answer {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int', comment: '用户ID' })
    userId: number

    @Column({ type: 'int', comment: '题目ID' })
    questionId: number

    @Column({ type: 'json', comment: '用户答案' })
    userAnswer: JSON;

    @Column({ type: 'tinyint', default: 0, comment: '0: 错误; 1: 正确' })
    @ApiProperty({ description: '是否正确' })
    isCorrect: number;

    @Column({ type: 'int', default: 0, comment: '得分' })
    pointEarned: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: null, onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}
