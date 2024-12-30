import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
@Entity('quiz_levels')
export class Level {
    @PrimaryGeneratedColumn()
    @ApiProperty({ description: '关卡id' })
    id: number;
    
    @Column({ type: 'int', comment: '题本id' })
    @ApiProperty({ description: '题本id' })
    bookId: number;

    @Column({ type: 'tinyint', comment: '关卡编号' })
    @ApiProperty({ description: '关卡编号' })
    levelNumber: number

    @Column({ type: 'varchar', comment: '关卡名称' })
    @ApiProperty({ description: '关卡名称' })
    name: string

    @Column({ type: 'tinyint', comment: '关卡题目数量' })
    @ApiProperty({ description: '关卡题目数量' })
    count: number

    @Column({ type: 'tinyint', comment: '奖励积分数量' })
    @ApiProperty({ description: '奖励积分数量' })
    reward: number

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    @ApiProperty({ description: '创建时间' })
    createdAt: Date

    @Column({ type: 'timestamp', default: null, onUpdate: 'CURRENT_TIMESTAMP' })
    @ApiProperty({ description: '更新时间' })
    updatedAt: Date
}
