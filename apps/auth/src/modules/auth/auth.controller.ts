import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { AuthDto } from './dto';
import { GetCurrentUser, GetCurrentUserId } from './decorators';
import { Public } from './decorators';
import { RtGuard } from './guards';
import { Response } from 'express';
import {
  DtoBadRequest,
  DtoUnauthorized,
  UnauthorizedError,
} from '@app/common/swagger/responses';
import { JwtTokensService } from './jwt.tokens.service';
import { MessagePattern } from '@nestjs/microservices';
import { REGISTER } from '../../../../api-gateway/src/modules/auth/constants';
import { Payload } from '@nestjs/microservices';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtTokenService: JwtTokensService,
  ) {}

  @MessagePattern(REGISTER)
  public async register(@Payload('dto') dto: AuthDto, res: Response) {
    return this.authService.register(dto, res);
  }
}
