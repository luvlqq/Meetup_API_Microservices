import { NestFactory } from '@nestjs/core';
import { MeetupsModule } from './modules/meetups/meetups.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { RmqService } from '@app/common';
import { RmqOptions } from '@nestjs/microservices';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(MeetupsModule, { cors: true });
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice<RmqOptions>(rmqService.getOptions('MEETUPS'));
  app.useGlobalPipes(new ValidationPipe());
  await app.startAllMicroservices();
  logger.log('Meetups is started', 'Microservice Init');
}
bootstrap();
