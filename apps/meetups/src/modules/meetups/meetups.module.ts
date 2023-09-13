import { Logger, Module } from '@nestjs/common';
import { MeetupsService } from './meetups.service';
import { MeetupsController } from './meetups.controller';
import { MeetupsRepository } from './meetups.repository';
import { PrismaModule } from '@app/common/db/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [MeetupsController],
  providers: [MeetupsService, MeetupsRepository, Logger],
})
export class MeetupsModule {}
