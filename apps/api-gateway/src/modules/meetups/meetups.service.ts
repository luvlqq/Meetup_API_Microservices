import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateMeetupDto, GetMeetupDto, UpdateMeetupDto } from './dto';
import { lastValueFrom } from 'rxjs';
import {
  ALL_MEETUPS,
  CHANGE_INFO,
  CREATE_MEETUP,
  DELETE_MEETUP,
  MEETUP_BY_ID,
  TEST,
} from './constants';
import { MEETUPS_SERVICE } from '../../../../meetups/src/constants';
import { User } from '@prisma/client';

@Injectable()
export class MeetupsService {
  constructor(@Inject('MEETUPS') private meetupClient: ClientProxy) {}

  public async getAllMeetups() {
    return await lastValueFrom(this.meetupClient.send(ALL_MEETUPS, {}));
  }

  public async testss() {
    return await lastValueFrom(this.meetupClient.send('testss', {}));
  }

  public async getMeetupById(id: number) {
    return await lastValueFrom(this.meetupClient.send(MEETUP_BY_ID, { id }));
  }

  public async createAMeetup(userId: number, dto: CreateMeetupDto) {
    return await lastValueFrom(
      this.meetupClient.send(CREATE_MEETUP, {
        dto: dto,
      }),
    );
  }

  public async changeInfoInMeetup(
    userId: number,
    id: number,
    dto: UpdateMeetupDto,
  ) {
    return await lastValueFrom(
      this.meetupClient.send(CHANGE_INFO, { userId: userId, id: id, dto: dto }),
    );
  }

  public async deleteMeetupById(userId: number, id: number) {
    return await lastValueFrom(
      this.meetupClient.send(DELETE_MEETUP, { userId: userId, id: id }),
    );
  }
}
