import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './modules/api-gateway/api-gateway.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { setupSwagger } from '@app/common/swagger/init/init.swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableShutdownHooks();

  const configService = app.get(ConfigService);

  setupSwagger(app);

  process.on('SIGINT', async () => {
    Logger.log('Server close by user');
    await app.close();
    process.exit(0);
  });

  process.on('SIGTERM', async () => {
    Logger.log('Server close by system');
    await app.close();
    process.exit(0);
  });

  await app.listen(3000);
}
bootstrap();
