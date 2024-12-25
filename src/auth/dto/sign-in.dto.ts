import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { IsNotEmpty } from "class-validator";

export class SignInDto {
    @ApiProperty({ description: '用户名', default: 'string' })
    @IsNotEmpty()
    @IsString()
    username: string;

    @ApiProperty({ description: '密码', default: '123' })
    @IsNotEmpty()
    @IsString()
    password: string;
}