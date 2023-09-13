import { IsArray, IsDate, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateMeetupDto {
  @ApiProperty({ description: 'Meetup name', nullable: false })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Meetup description', nullable: false })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ description: 'Meetup tags', nullable: false })
  @IsNotEmpty()
  @IsArray()
  tags: string[];

  @ApiProperty({ description: 'Meetup place', nullable: false })
  @IsNotEmpty()
  @IsString()
  place: string;

  @Type(() => Date)
  @ApiProperty({ description: 'Meetup date', nullable: false })
  @IsNotEmpty()
  @IsDate()
  date: Date;
}
