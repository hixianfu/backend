import { ApiProperty } from "@nestjs/swagger";
import { Course } from "src/course/entities/course.entity";
import { Question } from "src/question/entities/question.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('quiz_user_answer')
export class Answer {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.id)
    @JoinColumn({ name: 'userId' })
    @ApiProperty({ description: '用户ID' })
    userId: number

    @ManyToOne(() => Question, question => question.id)
    @JoinColumn({ name: 'questionId' })
    @ApiProperty({ description: '题目ID' })
    questionId: number

    @ManyToOne(() => Course, course => course.id)
    @JoinColumn({ name: 'courseId' })
    @ApiProperty({ description: '课程ID' }) 
    courseId: number

    @Column({ type: 'varchar', length: 255, comment: '用户答案' })
    @ApiProperty({ description: '用户答案' })
    userAnswer: string;

    @Column({ type: 'varchar', length: 255, comment: '正确答案' })
    @ApiProperty({ description: '正确答案' })
    correctAnswer: string;

    @Column({ type: 'tinyint', default: 0, comment: '0: 错误; 1: 正确' })
    @ApiProperty({ description: '是否正确' })
    isCorrect: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: null, onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}
