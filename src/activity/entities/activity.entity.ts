
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export enum ActivityType {
    WORD = 0,
    TIME = 1,
    SCORE = 2,
}

@Entity('user_activity')
export class Activity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int', nullable: false })
    userId: number;

    @Column({ type: 'enum', enum: ActivityType, nullable: false, comment: '活动类型 0: 单词 1: 时间 2: 分数' })
    activityType: ActivityType;

    @Column({ type: 'varchar', length: 40, nullable: false, comment: '活动日期 格式: YYYY-MM-DD' })
    activityDate: string;

    @Column({ type: 'int', nullable: false, comment: '活动值' })
    activityValue: number;

    @Column({ type: 'text', nullable: true, comment: '备注' })
    notes: string;

    @CreateDateColumn({ type: 'datetime', nullable: false, comment: '创建时间' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'datetime', default: null, comment: '更新时间' })
    updatedAt: Date;
}
