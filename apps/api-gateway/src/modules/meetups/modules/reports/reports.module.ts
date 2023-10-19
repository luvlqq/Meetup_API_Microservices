import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { RmqModule } from '@app/common';

@Module({
  imports: [RmqModule.register({ name: 'MEETUPS' })],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsGatewayModule {}
