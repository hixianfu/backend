import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import Redis from "ioredis";
import { InjectRedis } from '@nestjs-modules/ioredis';
import { UserService } from "src/user/user.service";
import { SignInDto } from "./dto/sign-in.dto";
import { comparePassword } from "src/utils/bcrypt";
import { User } from "src/user/entities/user.entity";


@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        @InjectRedis() private readonly redis: Redis,
    ) {}

    private readonly refreshTokenPrefix = 'refresh_token:';

    /**
     * 验证用户
     * @param signInDto 登录信息
     * @returns 用户信息
     */
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

    /**
     * 刷新令牌
     * @param username 用户名
     * @returns 
     */
    async refreshToken(token: string) {
        const username = this.jwtService.decode(token).username;

        if(!username) {
            throw new UnauthorizedException('用户名不存在');
        }

        const refresh_token = await this.redis.get(`${this.refreshTokenPrefix}${username}`);
        if(!refresh_token) {
            throw new UnauthorizedException('刷新令牌不存在');
        }

        const user = await this.userService.findOne(username);
        return {
            access_token: await this.generateAccessToken(user),
        };
    }

    /**
     * 生成访问令牌
     * @param user 用户
     * @returns 访问令牌
     */
    generateAccessToken(user: Omit<User, 'password'>) {
        const payload = { username: user.username, sub: user.id };
        return this.jwtService.signAsync(payload);
    }

    /**
     * 生成刷新令牌
     * @param user 用户
     * @returns 刷新令牌
     */
    generateRefreshToken(user: Omit<User, 'password'>) {
        const payload = { username: user.username, sub: user.id };
        return this.jwtService.signAsync(payload, { expiresIn: '7d' });
    }
    
    /**
     * 登录
     * @param user 用户
     * @returns 访问令牌
     */
    async login(user: Omit<User, 'password'>) {
        const refresh_token = await this.generateRefreshToken(user);
        const access_token = await this.generateAccessToken(user);
        await this.redis.set(`${this.refreshTokenPrefix}${user.username}`, refresh_token, 'EX', 60 * 60 * 24 * 7);

        return {
            access_token,
        };
    }

    /**
     * 获取用户信息
     * @param token 令牌
     * @returns 用户信息
     */
    async profile(token: string): Promise<Omit<User, 'password'>> {
        const username = this.jwtService.verify(token).username;

        const user = await this.userService.findOne(username);
        return user;
    }
}
