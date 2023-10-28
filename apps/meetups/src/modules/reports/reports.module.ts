import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { MeetupsRepository } from '../meetups/meetups.repository';

@Module({
  imports: [],
  controllers: [ReportsController],
  providers: [ReportsService, MeetupsRepository],
})
export class ReportsMicroserviceModule {}
