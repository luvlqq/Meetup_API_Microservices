import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateMeetupDto, GetMeetupDto, UpdateMeetupDto } from './dto';
import { lastValueFrom } from 'rxjs';
import {
  ALL_MEETUPS,
  CHANGE_INFO,
  CREATE_MEETUP,
  DELETE_MEETUP,
  GET_MEETUP_BY_CORDS,
  MEETUP_BY_ID,
} from './constants';
import { MeetupResponse } from './response';

@Injectable()
export class MeetupsService {
  constructor(@Inject('MEETUPS') private meetupClient: ClientProxy) {}

  public async getAllMeetups(
    dto: GetMeetupDto,
  ): Promise<MeetupResponse | string> {
    return await lastValueFrom(this.meetupClient.send(ALL_MEETUPS, { dto }));
  }

  public async getMeetupsByCords(long: number, lat: number) {
    return await lastValueFrom(
      this.meetupClient.send(GET_MEETUP_BY_CORDS, { long, lat }),
    );
  }

  public async getMeetupById(id: number): Promise<MeetupResponse | string> {
    return await lastValueFrom(this.meetupClient.send(MEETUP_BY_ID, { id }));
  }

  public async createAMeetup(
    userId: number,
    dto: CreateMeetupDto,
  ): Promise<MeetupResponse | string> {
    return await lastValueFrom(
      this.meetupClient.send(CREATE_MEETUP, {
        userId,
        dto,
      }),
    );
  }

  public async changeInfoInMeetup(
    userId: number,
    id: number,
    dto: UpdateMeetupDto,
  ): Promise<MeetupResponse | string> {
    return await lastValueFrom(
      this.meetupClient.send(CHANGE_INFO, { userId: userId, id: id, dto: dto }),
    );
  }

  public async deleteMeetupById(
    userId: number,
    id: number,
  ): Promise<MeetupResponse | string> {
    return await lastValueFrom(
      this.meetupClient.send(DELETE_MEETUP, { userId: userId, id: id }),
    );
  }
}
