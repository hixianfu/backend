import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('user_progress')
export class BookProgress {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int', comment: '用户ID' })
    userId: number;

    @Column({ type: 'int', comment: '题本ID' })
    bookId: number;

    @Column({ type: 'int', comment: '关卡ID' })
    levelId: number;

    @Column({ type: 'int', comment: '得分' })
    score: number;

    @Column({ type: 'tinyint', default: 0, comment: '是否完成 0: 未完成 1: 已完成' })
    completed: number;

    @Column({ type: 'int', default: 0, comment: '完成时间' })
    completedAt: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: null, onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}