import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository, UpdateResult } from 'typeorm';
import { hashPassword } from 'src/utils/bcrypt';

@Injectable()
export class UserService {
  
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    createUserDto.password = hashPassword(createUserDto.password);

    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  findOne(username: string): Promise<User> {
    return this.userRepository.findOne({ where: { username } });
  }

  findById(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  updateByCondition(updateData: Partial<User>, userId: number): Promise<UpdateResult> {
    return this.userRepository.update({ id: userId}, updateData);
}
}
