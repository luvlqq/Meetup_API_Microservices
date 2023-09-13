import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthDto } from './dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthRepository } from './auth.repository';
import { JwtTokensService } from './jwt.tokens.service';
import { Response } from 'express';
import { Constants } from '@app/common/constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly repository: AuthRepository,
    private readonly logger: Logger,
    private readonly jwtTokenService: JwtTokensService,
  ) {}

  public async register(dto: AuthDto, res: Response): Promise<void> {
    const findUser = await this.repository.foundUser(dto);

    if (findUser) {
      throw new BadRequestException('User with this login is already exist');
    }

    const hashedPassword = await this.hashData(dto.password);

    const newUser = await this.repository.createNewUser(dto, hashedPassword);

    const tokens = await this.jwtTokenService.signTokens(
      newUser.id,
      newUser.login,
    );
    await this.jwtTokenService.updateRtHash(newUser.id, tokens.refreshToken);
    await this.jwtTokenService.putTokensToCookies(
      newUser.id,
      newUser.login,
      res,
    );
  }

  public async login(dto: AuthDto, res: Response): Promise<void> {
    const user = await this.repository.foundUser(dto);

    if (!user) {
      throw new NotFoundException('User are not exist!');
    }

    const passwordMatches = await bcrypt.compare(dto.password, user.password);

    if (!passwordMatches) {
      throw new UnauthorizedException('Access denied! Incorrect password!');
    }
    const tokens = await this.jwtTokenService.signTokens(user.id, user.login);
    await this.jwtTokenService.updateRtHash(user.id, tokens.refreshToken);
    await this.jwtTokenService.putTokensToCookies(user.id, user.login, res);
  }

  public async signOut(userId: number): Promise<void> {
    await this.repository.signOut(userId);
  }

  public async hashData(data: string): Promise<string> {
    const saltOrRounds = Constants.roundOfSalt;
    return await bcrypt.hash(data, saltOrRounds);
  }
}
