import { NestFactory } from '@nestjs/core';
import { MeetupsModule } from './meetups.module';

async function bootstrap() {
  const app = await NestFactory.create(MeetupsModule);
  await app.listen(3000);
}
bootstrap();
