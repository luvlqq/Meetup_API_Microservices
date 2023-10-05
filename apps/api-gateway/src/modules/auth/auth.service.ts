import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { AuthDto } from './dto';
import { Response } from 'express';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom, tap } from 'rxjs';
import { REGISTER } from './constants';
import { PrismaService } from '@app/common/db/prisma.service';
import { AuthRepository } from '../../../../auth/src/modules/auth/auth.repository';
import { JwtTokensService } from '../../../../auth/src/modules/auth/jwt.tokens.service';
import { Constants } from '@app/common/constants';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH') private authClient: ClientProxy,
    private readonly prisma: PrismaService,
    private readonly repository: AuthRepository,
    private readonly jwtTokenService: JwtTokensService,
  ) {}

  public async register(dto: AuthDto, res: Response) {
    return await lastValueFrom(this.authClient.send(REGISTER, { dto, res }));
  }

  // public async register(dto: AuthDto, res: Response): Promise<void> {
  //   const findUser = await this.repository.foundUser(dto);
  //
  //   if (findUser) {
  //     throw new BadRequestException('User with this login is already exist');
  //   }
  //
  //   const hashedPassword = await this.hashData(dto.password);
  //
  //   const newUser = await this.repository.createNewUser(dto, hashedPassword);
  //
  //   const tokens = await this.jwtTokenService.signTokens(
  //     newUser.id,
  //     newUser.login,
  //   );
  //   await this.jwtTokenService.updateRtHash(newUser.id, tokens.refreshToken);
  //   await this.jwtTokenService.putTokensToCookies(
  //     newUser.id,
  //     newUser.login,
  //     res,
  //   );
  // }

  public async hashData(data: string): Promise<string> {
    const saltOrRounds = Constants.roundOfSalt;
    return await bcrypt.hash(data, saltOrRounds);
  }

  public async login() {}

  public async signOut() {}
}
