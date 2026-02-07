/* eslint-disable prettier/prettier */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1/gps');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  await app.listen(9032);
  console.log(`🚀 Server running on: http://localhost:9032/api/v1/gps`);
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
