import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';
// import { BoardEntity, UserEntity } from 'modules/data-access/entities';

config();

const typeORMMysqlConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  // entities: [UserEntity, BoardEntity],
  synchronize: false
};

export default typeORMMysqlConfig