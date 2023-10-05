import { Body, Controller, Param, ParseIntPipe, Query } from '@nestjs/common';
import { MeetupsService } from './meetups.service';
import { CreateMeetupDto, GetMeetupDto, UpdateMeetupDto } from './dto';
import { GetCurrentUserId } from '../../../../auth/src/modules/auth/decorators';
import { MeetupResponse } from './response';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { ALL_MEETUPS, CREATE_MEETUP } from './constants';
import { RmqService } from '@app/common';

@Controller()
export class MeetupsController {
  constructor(
    private readonly meetupsService: MeetupsService,
    private readonly rmqService: RmqService,
  ) {}

  @EventPattern(ALL_MEETUPS)
  public async getAllMeetups(
    @Query() dto: GetMeetupDto,
  ): Promise<MeetupResponse[] | string> {
    return this.meetupsService.getAllMeetups(dto);
  }

  //
  @MessagePattern('testss')
  public async testss() {
    return this.meetupsService.testss();
  }

  @EventPattern()
  public async getMeetupById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<MeetupResponse | string> {
    return this.meetupsService.getMeetupById(id);
  }

  @EventPattern(CREATE_MEETUP)
  public async createAMeetup(
    @GetCurrentUserId() userId: number,
    @Body() dto: CreateMeetupDto,
  ): Promise<MeetupResponse | string> {
    return this.meetupsService.createAMeetup(userId, dto);
  }

  @EventPattern()
  public async changeInfoInMeetup(
    @GetCurrentUserId() userId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateMeetupDto,
  ): Promise<MeetupResponse | string> {
    return this.meetupsService.changeInfoInMeetup(userId, id, dto);
  }

  @EventPattern()
  public async deleteMeetupById(
    @GetCurrentUserId() userId: number,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<MeetupResponse | string> {
    return this.meetupsService.deleteMeetupById(userId, id);
  }
}
