import { BadRequestError } from './bad.request.swagger';
import { ApiProperty } from '@nestjs/swagger';

export class DtoBadRequest extends BadRequestError {
  @ApiProperty()
  error: string;
}
