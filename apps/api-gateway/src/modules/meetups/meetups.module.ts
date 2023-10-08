import { Module } from '@nestjs/common';
import { MeetupsService } from './meetups.service';
import { MeetupsController } from './meetups.controller';
import { PrismaModule } from '@app/common/db/prisma.module';
import { RmqModule } from '@app/common';

@Module({
  imports: [PrismaModule, RmqModule.register({ name: 'MEETUPS' })],
  controllers: [MeetupsController],
  providers: [MeetupsService],
  exports: [RmqModule],
})
export class MeetupsGatewayModule {}
