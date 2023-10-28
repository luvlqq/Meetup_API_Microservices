import { Module } from '@nestjs/common';
import { UploadsController } from './uploads.controller';
import { UploadsService } from './uploads.service';
import { ConfigModule } from '@nestjs/config';
import { RmqModule } from '@app/common';
import { UploadsRepository } from './uploads.repository';
import { PrismaModule } from '@app/common/db/prisma.module';

@Module({
  imports: [
    PrismaModule,
    RmqModule,
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
  ],
  providers: [UploadsService, UploadsRepository],
  controllers: [UploadsController],
  exports: [UploadsModule],
})
export class UploadsModule {}
