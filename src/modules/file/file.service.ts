import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class FileService {
  async uploadImage(file: Express.Multer.File): Promise<string> {
    return file.path; // multer-storage-cloudinary가 자동으로 path를 Cloudinary URL로 세팅함
  }
}