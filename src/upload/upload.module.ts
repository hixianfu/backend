import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule]  ,
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
