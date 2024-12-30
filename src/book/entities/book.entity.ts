import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

export enum BookDifficulty {
    ZERO_BASIC = '零基础',
    BEGINNER = '入门',
    INTERMEDIATE = '进阶',
    ADVANCED = '高级'
}

@Entity('quiz_books')
export class Book {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar', length: 255, comment: '题本名称' })
    name: string

    @Column({ type: 'text', comment: '题本描述' })
    description: string

    @Column({ type: 'tinyint', comment: '题本关卡数量' })
    totalLevel: number

    @Column({ type: 'enum', enum: BookDifficulty, default: BookDifficulty.ZERO_BASIC, comment: '题本难度' })
    difficulty: BookDifficulty

    @Column({ type: 'varchar', length: 255, comment: '题本封面' })
    cover: string

    @Column({ type: 'tinyint', default: 1, comment: '是否激活 0: 不激活 1: 激活' })
    isActive: number

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date

    @Column({ type: 'timestamp', default: null, onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date
}
