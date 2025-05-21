import { Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileService } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express';

import { config } from 'dotenv';
import { Response } from 'express';
import * as path from 'path';
import * as fs from 'fs';

config();

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file: Express.Multer.File): string {
    const url = process.env.FILE_URL + file.filename;
    return url;
  }

  @Get(':imageName')
  getImage(
    @Param('imageName') imageName: string,
    @Res() response: Response
  ) {
    const rootPath = path.join(process.cwd(), process.env.FILE_PATH || 'fileUpload');
    const imagePath = path.join(rootPath, imageName);
    // console.log('[이미지 경로]', imagePath);

    if (!fs.existsSync(imagePath)) {
      return response.status(404).json({ message: 'File not found' });
    }

    return response.sendFile(imageName, { root: rootPath });
  }
  // @Get(':imageName')
  // getImage(
  //   @Param('imageName') imageName: string,
  //   @Res() response: Response
  // ) {
  //   const imagePath = path.join(process.cwd(), process.env.FILE_PATH || 'fileUpload', imageName);
  //   console.log(imagePath);

  //   if (!fs.existsSync(imagePath)) {
  //     return response.status(404).json({ message: 'File not found' });
  //   }

  //   return response.sendFile(imagePath);
  // }
}
