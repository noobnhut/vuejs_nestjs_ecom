import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

import * as cookieParser from 'cookie-parser';
async function bootstrap() {

  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);

  app.useGlobalPipes(new ValidationPipe());

  var cors = require('cors')

  app.use(cors())

  app.use(cookieParser());
  
  await app.listen(configService.get<string>('PORT'));
}
bootstrap();