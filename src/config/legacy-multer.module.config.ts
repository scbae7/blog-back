import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import { diskStorage } from "multer";
import { v4 as uuidv4 } from 'uuid';
import { config } from 'dotenv';
import * as path from 'path';
import { ImageFileFilter } from "filter";

config();

const uploadPath = process.env.FILE_PATH || path.join(__dirname, '..', '..', 'fileUpload');

// console.log('>>> [UPLOAD PATH]:', uploadPath);

const legacyMulterModuleConfig: MulterOptions = {
  storage: diskStorage({
    destination: uploadPath,
    filename: (request, file, callback) => {
      callback(null, uuidv4() + '.' + file.mimetype.split('/')[1]);
    }
  }),
  fileFilter: ImageFileFilter,
  limits: {
    fileSize: 1024 * 1024 * 100
  }
};

export { legacyMulterModuleConfig, uploadPath };
