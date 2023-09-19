import { Logger, Module } from '@nestjs/common';
import { MeetupsService } from './meetups.service';
import { MeetupsController } from './meetups.controller';
import { MeetupsRepository } from './meetups.repository';
import { PrismaModule } from '@app/common/db/prisma.module';
import { RmqModule } from '@app/common';
import { MEETUPS_SERVICE } from '../../constants';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    PrismaModule,
    RmqModule.register({ name: MEETUPS_SERVICE }),
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
  ],
  controllers: [MeetupsController],
  providers: [MeetupsService, MeetupsRepository, Logger],
})
export class MeetupsModule {}
