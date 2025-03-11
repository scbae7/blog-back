import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { HttpExceptionFilter } from 'filter';
import { ValidationPipe } from '@nestjs/common';
import { validationPipeConfig } from 'config';

async function bootstrap() {
  config();
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe(validationPipeConfig));
  app.enableCors();
  await app.listen(process.env.SERVER_PORT);
}
bootstrap();
