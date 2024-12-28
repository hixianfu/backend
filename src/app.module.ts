import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UploadModule } from './upload/upload.module';
import { VocabularyModule } from './vocabulary/vocabulary.module';
import { WordModule } from './word/word.module';
import { RedisModule } from '@nestjs-modules/ioredis';
import { ProgressModule } from './progress/progress.module';
import { QuestionModule } from './question/question.module';
import { CourseModule } from './course/course.module';
import { AnswerModule } from './answer/answer.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    RedisModule.forRoot({
      type: 'single',
      url: process.env.REDIS_URL,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UploadModule,
    VocabularyModule,
    WordModule,
    ProgressModule,
    QuestionModule,
    CourseModule,
    AnswerModule
  ],
  controllers: [],
  providers: [],
  exports: [RedisModule],
})
export class AppModule { }
