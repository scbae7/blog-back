import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { MulterModule } from '@nestjs/platform-express';
import { multerModuleConfig } from 'config'; // Cloudinary 설정된 multer config만 유지

@Module({
  imports : [
    MulterModule.register(multerModuleConfig), // 여기는 그대로 유지
  ],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}