import { ApiProperty } from "@nestjs/swagger";
import { ActivityType } from "../entities/activity.entity";

export class CreateActivityDto {
    @ApiProperty({ description: '用户ID', required: true })
    userId: number;

    @ApiProperty({ description: '活动类型', required: true })
    activityType: ActivityType;

    @ApiProperty({ description: '活动日期', required: false })
    activityDate: string;

    @ApiProperty({ description: '活动值', required: true })
    activityValue: number;

    @ApiProperty({ description: '备注', required: false })
    notes: string;
}
