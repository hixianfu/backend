import { ApiProperty } from "@nestjs/swagger";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

export enum CourseLevel {
    ZERO = '0', // 零基础
    BEGINNER = '1', // 初级
    INTERMEDIATE = '2', // 中级
    ADVANCED = '3' // 高级
}

@Entity('course')
export class Course {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ comment: '课程名称' })
    @ApiProperty({ description: '课程名称' })
    title: string

    @Column({ comment: '课程封面' })
    @ApiProperty({ description: '课程封面' })
    cover: string

    @Column({ type: 'enum', enum: CourseLevel, default: CourseLevel.ZERO, comment: '0: 零基础; 1: 初级; 2: 中级; 3: 高级' })
    @ApiProperty({ description: '课程等级' })
    level: CourseLevel

    @Column({ comment: '课程题目数量' })
    @ApiProperty({ description: '课程题目数量' })
    quizCount: number

    @Column({ comment: '课程描述' })
    @ApiProperty({ description: '课程描述' })
    description: string

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date

    @Column({ type: 'timestamp', default: null, onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date
}
