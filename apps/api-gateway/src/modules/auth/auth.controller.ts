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
import { JwtTokensService } from 'apps/auth/src/modules/auth/jwt.tokens.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService, // private readonly jwtTokenService: JwtTokensService,
  ) {}

  // @Public()
  @Post('register')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Register user account' })
  @ApiResponse({ status: 204, description: 'Success' })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request',
    type: DtoBadRequest,
    schema: {
      $ref: getSchemaPath(DtoBadRequest),
    },
  })
  public async register(
    @Body() dto: AuthDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    await this.authService.register(dto, res);
  }

  // @Public()
  // @Post('login')
  // @HttpCode(HttpStatus.NO_CONTENT)
  // @ApiOperation({ summary: 'Log in as a user to your account' })
  // @ApiResponse({ status: 204, description: 'Success' })
  // @ApiResponse({
  //   status: HttpStatus.BAD_REQUEST,
  //   description: 'Bad request',
  //   schema: {
  //     $ref: getSchemaPath(DtoBadRequest),
  //   },
  // })
  // @ApiResponse({
  //   status: HttpStatus.UNAUTHORIZED,
  //   description: 'Unauthorized',
  //   type: DtoUnauthorized,
  //   schema: {
  //     $ref: getSchemaPath(DtoUnauthorized),
  //   },
  // })
  // public async login(
  //   @Body() dto: AuthDto,
  //   @Res({ passthrough: true }) res: Response,
  // ): Promise<void> {
  //   await this.authService.login(dto, res);
  // }

  // @Post('signOut')
  // @HttpCode(HttpStatus.OK)
  // @ApiOperation({ summary: 'Sign out from account' })
  // @ApiResponse({
  //   status: HttpStatus.UNAUTHORIZED,
  //   description: 'Unauthorized',
  //   type: UnauthorizedError,
  //   schema: {
  //     $ref: getSchemaPath(UnauthorizedError),
  //   },
  // })
  // @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  // public async signOut(
  //   @GetCurrentUserId() userId: number,
  //   @Res({ passthrough: true }) res: Response,
  // ): Promise<void> {
  //   res.clearCookie('accessToken');
  //   res.clearCookie('refreshToken');
  //   return this.authService.signOut(userId);
  // }

  // @Public()
  // @UseGuards(RtGuard)
  // @Post('refresh')
  // @HttpCode(HttpStatus.CREATED)
  // @ApiOperation({ summary: 'Refresh token' })
  // @ApiResponse({
  //   status: HttpStatus.UNAUTHORIZED,
  //   description: 'Unauthorized',
  //   schema: {
  //     $ref: getSchemaPath(UnauthorizedError),
  //   },
  // })
  // @ApiResponse({ status: HttpStatus.CREATED, description: 'Success' })
  // public async refreshTokens(
  //   @GetCurrentUserId() userId: number,
  //   @GetCurrentUser('refreshToken') refreshToken: string,
  // ): Promise<void> {
  //   await this.jwtTokenService.refreshTokens(userId, refreshToken);
  // }
}
