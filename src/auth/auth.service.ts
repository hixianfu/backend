import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/user/user.service";
import { SignInDto } from "./dto/sign-in.dto";
import { comparePassword } from "src/utils/bcrypt";
import { User } from "src/user/entities/user.entity";


@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    async validateUser(signInDto: SignInDto) {
        const user = await this.userService.findOne(signInDto.username);

        if(!user) {
            throw new UnauthorizedException('用户不存在');
        }
        
        if(!comparePassword(signInDto.password, user.password)) {
            throw new UnauthorizedException('密码错误');
        }

        if(comparePassword(signInDto.password, user.password)) {
            const { password, ...result } = user;
            return result;
        }

        return null
    }

    generateAccessToken(user: User) {
        const payload = { username: user.username, sub: user.id };
        return this.jwtService.signAsync(payload);
    }

    async login(user: Omit<User, 'password'>) {
        const payload = { username: user.username, sub: user.id };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
