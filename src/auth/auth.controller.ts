import { Controller, Post, Body, UnauthorizedException, UseGuards, Get, Request } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { SignInDto } from "./dto/sign-in.dto";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { UserService } from "src/user/user.service";
import { comparePassword } from "src/utils/bcrypt";

@ApiBearerAuth('Authorization')
@ApiTags('认证')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
    ) {}

    @Post('login')
    @ApiOperation({ summary: '登录' })
    @ApiBody({ type: SignInDto })
    async signIn(@Body() signInDto: SignInDto) {
        const user = await this.authService.validateUser(signInDto);

        return this.authService.login(user);
    }

    @Get('profile')
    @ApiOperation({ summary: '获取个人信息' })
    @UseGuards(JwtAuthGuard)
    async getProfile(@Request() req) {
        const user = await this.userService.findOne(req.user.username);
        return user;
    }
}
