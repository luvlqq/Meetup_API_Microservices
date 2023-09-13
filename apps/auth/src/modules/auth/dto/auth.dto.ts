import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty({ description: 'User login', nullable: false })
  @IsNotEmpty()
  @IsString()
  login: string;

  @ApiProperty({ description: 'User password', nullable: false })
  @IsNotEmpty()
  @IsString()
  password: string;
}
