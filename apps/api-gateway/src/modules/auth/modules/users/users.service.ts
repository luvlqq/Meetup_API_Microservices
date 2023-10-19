import { Inject, Injectable } from '@nestjs/common';
import { UserResponse } from './response';
import { MeetupResponse } from '../../../meetups/modules/meetups/response';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { GET_USER_INFO, SUBSCRIBE_TO_MEETUP } from './constants';

@Injectable()
export class UsersService {
  constructor(@Inject('AUTH') private authClient: ClientProxy) {}

  public async getUserInfo(id: number): Promise<UserResponse> {
    return await lastValueFrom(this.authClient.send(GET_USER_INFO, { id }));
  }

  public async subscribeToMeetup(
    userId: number,
    meetupId: number,
  ): Promise<MeetupResponse> {
    return await lastValueFrom(
      this.authClient.send(SUBSCRIBE_TO_MEETUP, { userId, meetupId }),
    );
  }
}
