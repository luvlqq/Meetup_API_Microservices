import { Module } from '@nestjs/common';
import { MeetupsService } from './meetups.service';
import { MeetupsController } from './meetups.controller';
import { TestsController } from './tests.controller';
import { PrismaModule } from '@app/common/db/prisma.module';
import { RmqModule } from '@app/common';

@Module({
  imports: [PrismaModule, RmqModule.register({ name: 'MEETUPS' })],
  controllers: [MeetupsController, TestsController],
  providers: [MeetupsService],
  exports: [RmqModule],
})
export class MeetupsMicroserviceModule {}
