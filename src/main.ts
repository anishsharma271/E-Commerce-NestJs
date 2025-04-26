import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './utils/interceptor/response.interceptor';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalPipes(new ValidationPipe());
  app.use(morgan(':method :status :url '));
  await app.listen(process.env.PORT);
  console.log(`🚀 Server running on http://localhost:${process.env.PORT}`);
}
bootstrap();
