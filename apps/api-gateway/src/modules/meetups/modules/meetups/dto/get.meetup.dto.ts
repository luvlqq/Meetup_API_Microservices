import { IsDateString, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetMeetupDto {
  @ApiProperty({ description: 'Meetup name', required: false })
  @IsOptional()
  name?: string;

  @ApiProperty({ description: 'Date from', required: false })
  @IsOptional()
  @IsDateString()
  from?: string;

  @ApiProperty({ description: 'Date to', required: false })
  @IsOptional()
  @IsDateString()
  to?: string;

  @ApiProperty({
    description: 'Sort type',
    enum: ['asc', 'desc'],
    required: false,
  })
  @IsOptional()
  @IsEnum(['asc', 'desc'])
  sort?: 'asc' | 'desc';

  @ApiProperty({
    description: 'Page size',
    required: false,
    minimum: 1,
    default: 10,
  })
  @IsOptional()
  limit?: number = 10;

  @ApiProperty({ description: 'Page number', nullable: true })
  @IsOptional()
  page?: number;
}
