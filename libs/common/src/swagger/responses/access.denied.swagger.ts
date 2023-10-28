import { ApiProperty } from '@nestjs/swagger';

export class AccessDenied {
  @ApiProperty()
  response: string;

  @ApiProperty()
  status: number;

  @ApiProperty()
  message: string;

  @ApiProperty()
  name: string;
}
