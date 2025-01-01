import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum ProgressStatus {
    FORGOT = 0, // 忘记
    FAMILIAR = 1, // 熟悉
    LEARNED = 2 // 已学会
}

@Entity('user_word_progress')
export class Progress {

    @PrimaryGeneratedColumn()
    @ApiProperty({ description: '进度ID' })
    id: number;

    @Column({ type: 'int', comment: '用户ID' })
    @ApiProperty({ description: '用户ID' })
    userId: number;

    @Column({ type: 'int', comment: '单词ID' })
    @ApiProperty({ description: '单词ID11' })
    wordId: number;

    @Column({ type: 'enum', enum: ProgressStatus })
    @ApiProperty({ description: '进度状态' })
    status: ProgressStatus;

    @Column({ type: 'timestamp', default: null })
    @ApiProperty({ description: '下次复习时间' })
    nextReviewTime: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    @ApiProperty({ description: '创建时间' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: null, onUpdate: 'CURRENT_TIMESTAMP' })
    @ApiProperty({ description: '更新时间' })
    updatedAt: Date;
}
