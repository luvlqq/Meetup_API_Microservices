import { PartialType } from '@nestjs/swagger';
import { CreateMeetupDto } from './create.meetup.dto';

export class UpdateMeetupDto extends PartialType(CreateMeetupDto) {}
