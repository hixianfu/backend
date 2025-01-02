import { Injectable } from '@nestjs/common';
import { CreateLevelDto } from './dto/create-level.dto';
import { UpdateLevelDto } from './dto/update-level.dto';
import { Level } from './entities/level.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookProgressService } from 'src/book-progress/book-progress.service';

@Injectable()
export class LevelService {

  constructor(
    @InjectRepository(Level)
    private readonly levelRepository: Repository<Level>,

    private readonly bookProgressService: BookProgressService,
  ) {}  

  create(createLevelDto: CreateLevelDto) {
    return this.levelRepository.save(createLevelDto);
  }

  /**
   * 获取题本所有关卡
   * @param bookId 题本id
   * @param userId 用户id
   * @returns 题本所有关卡
   */
  async findByBookId(bookId: number, userId: number): Promise<Level & { isUnlocked: string }[]> {
    const sql = `
    SELECT l.*,
    CASE 
        WHEN l.levelNumber <= (
            SELECT COUNT(*) 
            FROM user_progress 
            WHERE bookId = ${bookId} AND userId = ${userId}
        ) + 1 THEN 1
        ELSE 0
    END as isUnlocked
    FROM quiz_levels l
    WHERE l.bookId = ${bookId};
    `
    
    const levels = await this.levelRepository.query(sql);

    return levels;
  }

  /**
   * 根据关卡id获取关卡
   * @param levelId 关卡id
   * @returns 关卡
   */
  findLevelById(levelId: number) {
    return this.levelRepository.findOne({ where: { id: levelId } });
  }

  findAll() {
    return this.levelRepository.find();
  }

  findOne(id: number) {
    return this.levelRepository.findOne({ where: { id } });
  }

  update(id: number, updateLevelDto: UpdateLevelDto) {
    return `This action updates a #${id} level`;
  }

  remove(id: number) {
    return `This action removes a #${id} level`;
  }
}
