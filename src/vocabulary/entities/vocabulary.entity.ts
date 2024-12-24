import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Vocabulary {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: '词汇本ID' })
  id: number;

  @Column({ length: 50, comment: '词汇本名称' })
  @ApiProperty({ description: '词汇本名称' })
  name: string;

  @Column({ length: 255, comment: '词汇本描述' })
  @ApiProperty({ description: '词汇本描述' })
  description: string;

  @Column({ default: '', comment: '词汇本封面' })
  @ApiProperty({ description: '封面' })
  cover: string;

  @CreateDateColumn({ comment: '创建时间' })
  @ApiProperty({ description: '创建时间' })
  createdAt: Date;
  
  @UpdateDateColumn({ comment: '更新时间' })
  @ApiProperty({ description: '更新时间' })
  updatedAt: Date;
}
