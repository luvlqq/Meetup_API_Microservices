import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { MeetupResponse } from '../../../../meetups/src/modules/meetups/response';
import { UsersResponse } from './response';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  GET_USER_INFO,
  SUBSCRIBE_TO_MEETUP,
} from '../../../../api-gateway/src/modules/auth/modules/users/constants';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern(GET_USER_INFO)
  public async getUserInfo(@Payload('id') id: number): Promise<UsersResponse> {
    return this.usersService.getUserInfo(id);
  }

  @MessagePattern(SUBSCRIBE_TO_MEETUP)
  public async subscribeToMeetup(
    @Payload('userId') userId: number,
    @Payload('meetupId') meetupId: number,
  ): Promise<MeetupResponse> {
    return this.usersService.subscribeToMeetup(userId, meetupId);
  }
}
