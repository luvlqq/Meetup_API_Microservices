import { NestFactory } from '@nestjs/core';
import { AuthModule } from './modules/auth/auth.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AuthModule, { cors: true });

  logger.log('Auth is started', 'Microservice Init');

  await app.startAllMicroservices();
}
bootstrap();
