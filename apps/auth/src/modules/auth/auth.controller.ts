import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthDto } from './dto';
import { JwtTokensService } from './jwt.tokens.service';
import { MessagePattern } from '@nestjs/microservices';
import {
  LOGIN,
  REFRESH,
  REGISTER,
  SIGNOUT,
  VALIDATE_USER,
} from '../../../../api-gateway/src/modules/auth/constants';
import { Payload } from '@nestjs/microservices';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtTokenService: JwtTokensService,
  ) {}

  @MessagePattern(REGISTER)
  public async register(@Payload('dto') dto: AuthDto) {
    return this.authService.register(dto);
  }

  @MessagePattern(LOGIN)
  public async login(@Payload('dto') dto: AuthDto) {
    return this.authService.login(dto);
  }

  @MessagePattern(SIGNOUT)
  public async signout(@Payload('userId') userId: number) {
    return this.authService.signOut(userId);
  }

  @MessagePattern(REFRESH)
  public async refreshTokens(
    @Payload('userId') userId: number,
    @Payload('refreshToken') refreshToken: string,
  ) {
    return this.jwtTokenService.refreshTokens(userId, refreshToken);
  }

  @MessagePattern(VALIDATE_USER)
  public async validateUser(@Payload('email') email: string) {
    return this.authService.validateUser(email);
  }
}
