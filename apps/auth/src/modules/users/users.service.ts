import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { UsersResponse } from './response';
import { MeetupResponse } from '../../../../meetups/src/modules/meetups/response';

@Injectable()
export class UsersService {
  constructor(private readonly repository: UsersRepository) {}

  async getUserInfo(id: number): Promise<UsersResponse> {
    return this.repository.getUserInfo(id);
  }

  async subscribeToMeetup(
    userId: number,
    meetupId: number,
  ): Promise<MeetupResponse> {
    return await this.repository.subscribeToMeetup(userId, meetupId);
  }
}
