import { Controller } from '@nestjs/common';
import { MeetupsService } from './meetups.service';

@Controller('meetups')
export class MeetupsController {
  constructor(private readonly meetupsService: MeetupsService) {}
}
