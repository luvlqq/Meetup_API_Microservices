import { NestFactory } from '@nestjs/core';
import { MeetupsModule } from './modules/meetups/meetups.module';
import { Logger } from '@nestjs/common';
import { RmqService } from '@app/common';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(MeetupsModule, { cors: true });
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions('MEETUPS'));

  await app.startAllMicroservices();
  logger.log('Meetups is started', 'Microservice Init');
}
bootstrap();
