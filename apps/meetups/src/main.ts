import { NestFactory } from '@nestjs/core';
import { MeetupsModule } from './modules/meetups/meetups.module';

async function bootstrap() {
  const app = await NestFactory.create(MeetupsModule);
  await app.startAllMicroservices();
}
bootstrap();
