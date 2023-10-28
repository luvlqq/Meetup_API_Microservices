import { Controller, Get, Query } from '@nestjs/common';
import { ElasticGatewayService } from './elastic.service';

@Controller('smart')
export class ElasticGatewayController {
  constructor(private readonly elasticService: ElasticGatewayService) {}

  @Get()
  public async smartFind(@Query('search') search: string) {
    return this.elasticService.smartFindMeetups(search);
  }
}
