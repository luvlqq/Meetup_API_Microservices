import type { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication): void {
  const documentBuilder = new DocumentBuilder()
    .setTitle('Meetup microservice API')
    .setDescription('Meetup microservice API doc')
    .setVersion('1.0');

  const document = SwaggerModule.createDocument(app, documentBuilder.build());
  SwaggerModule.setup('documentation', app, document);
}
