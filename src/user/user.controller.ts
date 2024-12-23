import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('用户')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @ApiOperation({ summary: '注册' })
  create(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
}
