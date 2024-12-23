import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    @ApiProperty({ description: '用户ID' })
    id: number;

    @Column({ length: 50 })
    @ApiProperty({ description: '姓名' })
    name: string;

    @Column({ length: 50 })
    @ApiProperty({ description: '用户名' })
    username: string;

    @Column({ length: 100 })
    @ApiProperty({ description: '邮箱' })
    email: string;

    @Column({ length: 50, default: '' })
    @ApiProperty({ description: '手机号' })
    phone: string

    @Column({ length: 100 })
    @ApiProperty({ description: '密码' })
    password: string;

    @Column({ default: '' })
    @ApiProperty({ description: '头像' })
    avatar: string

    @CreateDateColumn()
    @ApiProperty({ description: '创建时间' })
    createdAt: Date;

    @UpdateDateColumn()
    @ApiProperty({ description: '更新时间' })
    updatedAt: Date;
}
