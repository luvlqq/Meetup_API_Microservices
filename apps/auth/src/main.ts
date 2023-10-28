import { NestFactory } from '@nestjs/core';
import { AuthMicroserviceModule } from './modules/auth/auth.module';
import { Logger } from '@nestjs/common';
import { RmqService } from '@app/common';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AuthMicroserviceModule, { cors: true });
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions('AUTH', true));

  logger.log('Auth is started', 'Microservice Init');

  await app.startAllMicroservices();
}
bootstrap();
