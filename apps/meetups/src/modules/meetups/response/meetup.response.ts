import { ApiProperty } from '@nestjs/swagger';

export class MeetupResponse {
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
  long: number;

  @ApiProperty()
  lat: number;

  @ApiProperty()
  tags: string[];

  @ApiProperty()
  meetupCreator: number;
}
