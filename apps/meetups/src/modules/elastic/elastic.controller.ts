import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { ELASTIC } from '../../../../api-gateway/src/modules/meetups/modules/meetups/constants';
import { ElasticMicroserviceService } from './elastic.service';

@Controller()
export class ElasticMicroserviceController {
  constructor(private readonly elasticService: ElasticMicroserviceService) {}

  @EventPattern(ELASTIC)
  public async elasticSearch(@Payload('search') search: string) {
    return this.elasticService.searchMeetups(search);
  }
}
