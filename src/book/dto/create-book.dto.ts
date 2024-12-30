import { ApiProperty } from "@nestjs/swagger";
import { BookDifficulty } from "../entities/book.entity";
import { IsEnum } from "class-validator";
export class CreateBookDto {
    @ApiProperty({ description: '题本名称' })
    name: string

    @ApiProperty({ description: '题本描述' })
    description: string

    @ApiProperty({ description: '题本封面' })
    cover: string

    @ApiProperty({ description: '题本关卡数量' })
    totalLevel: number

    @ApiProperty({ description: '题本难度' })
    @IsEnum(BookDifficulty)
    difficulty: BookDifficulty
}
