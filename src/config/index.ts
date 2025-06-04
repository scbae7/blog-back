import typeORMMysqlConfig from "./typeorm.mysql.config";
import passportJwtConfig from "./passport.jwt.config";
import validationPipeConfig from "./validation.pipe.config";
import jwtModuleConfig from "./jwt.module.config";
import multerModuleConfig from "./multer.module.config";
import { legacyMulterModuleConfig } from "./legacy-multer.module.config";
import serveStaticModuleConfig from "./serve-static.module.config";

export { 
  typeORMMysqlConfig,
  passportJwtConfig,
  validationPipeConfig,
  jwtModuleConfig,
  multerModuleConfig,
  legacyMulterModuleConfig,
  serveStaticModuleConfig
 };