import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty({ description: 'User email', nullable: false })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({ description: 'User password', nullable: false })
  @IsNotEmpty()
  @IsString()
  password: string;
}
