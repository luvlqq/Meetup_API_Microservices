import { Controller, Get } from '@nestjs/common';
import { MeetupsService } from './meetups.service';

@Controller()
export class MeetupsController {
  constructor(private readonly meetupsService: MeetupsService) {}

  @Get()
  getHello(): string {
    return this.meetupsService.getHello();
  }
}
