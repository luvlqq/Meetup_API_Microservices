import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import {
  GENERATE_CSV,
  GENERATE_PDF,
} from '../../../../api-gateway/src/modules/meetups/constants';
import { ReportsService } from './reports.service';

@Controller()
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @EventPattern(GENERATE_CSV)
  public async generateCsv() {
    return this.reportsService.generateCsv();
  }

  @EventPattern(GENERATE_PDF)
  public async generatePdf() {
    return this.reportsService.generatePdf();
  }
}
