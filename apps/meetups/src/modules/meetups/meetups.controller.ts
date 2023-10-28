import { Controller, Logger } from '@nestjs/common';
import { MeetupsService } from './meetups.service';
import { CreateMeetupDto, GetMeetupDto, UpdateMeetupDto } from './dto';
import { MeetupResponse } from './response';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { ALL_MEETUPS, CREATE_MEETUP } from './constants';
import {
  CHANGE_INFO,
  DELETE_MEETUP,
  GET_MEETUP_BY_CORDS,
  MEETUP_BY_ID,
} from '../../../../api-gateway/src/modules/meetups/modules/meetups/constants';

@Controller()
export class MeetupsController {
  constructor(private readonly meetupsService: MeetupsService) {}

  @MessagePattern(ALL_MEETUPS)
  public async getAllMeetups(
    @Payload('dto') dto: GetMeetupDto,
  ): Promise<MeetupResponse[] | string> {
    return this.meetupsService.getAllMeetups(dto);
  }

  @MessagePattern(GET_MEETUP_BY_CORDS)
  public async getMeetupsByCords(
    @Payload('long') long: number,
    @Payload('lat') lat: number,
  ): Promise<MeetupResponse | string> {
    Logger.log(`Log in meetups controller: ${long}, ${lat}`);
    return this.meetupsService.getMeetupsByCords(long, lat);
  }

  @MessagePattern(MEETUP_BY_ID)
  public async getMeetupById(
    @Payload('id') id: number,
  ): Promise<MeetupResponse | string> {
    return this.meetupsService.getMeetupById(id);
  }

  @MessagePattern(CREATE_MEETUP)
  public async createAMeetup(
    @Payload('userId') userId: number,
    @Payload('dto') dto: CreateMeetupDto,
  ): Promise<MeetupResponse | string> {
    return this.meetupsService.createAMeetup(userId, dto);
  }

  @EventPattern(CHANGE_INFO)
  public async changeInfoInMeetup(
    @Payload('userId') userId: number,
    @Payload('id') id: number,
    @Payload('dto') dto: UpdateMeetupDto,
  ): Promise<MeetupResponse | string> {
    return this.meetupsService.changeInfoInMeetup(userId, id, dto);
  }

  @EventPattern(DELETE_MEETUP)
  public async deleteMeetupById(
    @Payload('userId') userId: number,
    @Payload('id') id: number,
  ): Promise<MeetupResponse | string> {
    return this.meetupsService.deleteMeetupById(userId, id);
  }
}
