import { ApiProperty } from '@nestjs/swagger';

export class Meetup {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  place: string;

  @ApiProperty()
  date: Date;

  @ApiProperty()
  tags: string[];

  @ApiProperty()
  meetupCreator: number;
}

export class UsersResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  role: string;

  @ApiProperty()
  hashRt: string;

  @ApiProperty()
  followedMeetups: Meetup[];

  @ApiProperty()
  createdMeetups: Meetup[];
}
