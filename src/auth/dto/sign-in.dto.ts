import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { IsNotEmpty } from "class-validator";

export class SignInDto {
    @ApiProperty({ description: '用户名' })
    @IsNotEmpty()
    @IsString()
    username: string;

    @ApiProperty({ description: '密码' })
    @IsNotEmpty()
    @IsString()
    password: string;
}