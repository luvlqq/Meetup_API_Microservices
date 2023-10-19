import { Controller, Get, Header, Res } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { Response } from 'express';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('test')
  public async test() {
    return 123;
  }

  @Get('pdf')
  @Header('Content-Type', 'text/pdf')
  @Header('Content-Disposition', 'attachment; filename=meetups.pdf')
  public async generatePdf(@Res() res: Response) {
    const result = await this.reportsService.generatePdf();
    res.sendFile(result);
  }

  @Get('csv')
  @Header('Content-Type', 'text/csv')
  @Header('Content-Disposition', 'attachment; filename=meetups.csv')
  public async generateCsv() {
    return this.reportsService.generateCsv();
  }
}
