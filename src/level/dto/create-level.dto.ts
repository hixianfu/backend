import { ApiProperty } from "@nestjs/swagger"

export class CreateLevelDto {
    @ApiProperty({ description: '题本id' })
    bookId: number

    @ApiProperty({ description: '关卡编号' })
    levelNumber: number

    @ApiProperty({ description: '关卡名称' })
    name: string

    @ApiProperty({ description: '关卡题目数量' })
    count: number

    @ApiProperty({ description: '奖励积分数量' })
    reward: number
}
