// src/config/multer.module.config.ts

import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { Express } from 'express';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const multerOptions = {
  storage: new CloudinaryStorage({
    cloudinary,
    params: async (req, file): Promise<any> => {
      return {
        // folder: 'blog', // 원하는 폴더 이름
        allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
        public_id: file.originalname.split('.')[0], // 선택: 원래 파일명 기반 저장
      };
    },
  }),
};

export default multerOptions;
