import { NestFactory } from '@nestjs/core';
import { AuthModule } from './modules/auth/auth.module';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  await app.startAllMicroservices();
}
bootstrap();
