import { Module } from '@nestjs/common';
import { MeetupsService } from './meetups.service';
import { MeetupsController } from './meetups.controller';

@Module({
  imports: [],
  controllers: [MeetupsController],
  providers: [MeetupsService],
})
export class MeetupsModule {}
