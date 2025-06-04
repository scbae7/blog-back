import { join } from "path";
import { ServeStaticModuleOptions } from "@nestjs/serve-static";
import { uploadPath } from "./legacy-multer.module.config";

import { config } from  'dotenv';

config();

const serveStaticModuleConfig: ServeStaticModuleOptions = {
  rootPath: process.env.FILE_PATH || uploadPath,
  serveRoot: "/uploads",
}

export default serveStaticModuleConfig;