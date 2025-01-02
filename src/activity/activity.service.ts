import { Injectable } from '@nestjs/common';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Activity } from './entities/activity.entity';

@Injectable()
export class ActivityService {

  constructor(
    @InjectRepository(Activity)
    private readonly activityRepository: Repository<Activity>,
  ) {}

  create(createActivityDto: CreateActivityDto) {
    return this.activityRepository.save(createActivityDto);
  }

  findAll() {
    return this.activityRepository.find();
  }

  /**
   * 获取用户今日活动
   * @param userId 用户id
   * @returns 用户今日活动
   */
  findTodayAllByUserId(userId: number) {
    // 获取activity表中userId为userId，activityDate为今天的活动 activityDate格式为YYYY-MM-DD
    const activityDate = new Date().toISOString().split('T')[0];
    console.log(activityDate);
    return this.activityRepository.find({ where: { userId, activityDate } });
  }

  findOne(id: number) {
    return `This action returns a #${id} activity`;
  }

  update(id: number, updateActivityDto: UpdateActivityDto) {
    return `This action updates a #${id} activity`;
  }

  remove(id: number) {
    return `This action removes a #${id} activity`;
  }
}
