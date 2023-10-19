import { Module } from '@nestjs/common';
import { MeetupsService } from './meetups.service';
import { MeetupsController } from './meetups.controller';
import { PrismaModule } from '@app/common/db/prisma.module';
import { RmqModule } from '@app/common';
import { ReportsGatewayModule } from '../reports/reports.module';

@Module({
  imports: [
    PrismaModule,
    RmqModule.register({ name: 'MEETUPS' }),
    ReportsGatewayModule,
  ],
  controllers: [MeetupsController],
  providers: [MeetupsService],
  exports: [RmqModule],
})
export class MeetupsGatewayModule {}
