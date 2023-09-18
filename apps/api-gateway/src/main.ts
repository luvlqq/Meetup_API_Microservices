import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './modules/api-gateway/api-gateway.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { setupSwagger } from '@app/common/swagger/init/init.swagger';
import { RmqService } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);
  const rmqService = app.get<RmqService>(RmqService);

  setupSwagger(app);

  app.useGlobalPipes(new ValidationPipe());
  app.enableShutdownHooks();
  app.connectMicroservice(rmqService.getOptions('GATEWAY'));

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

  await app.startAllMicroservices();
}
bootstrap();
