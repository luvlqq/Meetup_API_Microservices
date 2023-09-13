import { ApiProperty } from '@nestjs/swagger';

export class UnauthorizedError {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: string;
}
