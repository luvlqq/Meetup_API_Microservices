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
import { Constants } from '@app/common/constants';
import { PrismaService } from '@app/common/db/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly repository: AuthRepository,
    private readonly logger: Logger,
    private readonly jwtTokenService: JwtTokensService,
    private readonly prisma: PrismaService,
  ) {}

  public async register(dto: AuthDto) {
    const findUser = await this.repository.foundUser(dto);

    if (findUser) {
      throw new BadRequestException('User with this login is already exist');
    }

    const hashedPassword = await this.hashData(dto.password);

    const newUser = await this.repository.createNewUser(dto, hashedPassword);

    const tokens = await this.jwtTokenService.signTokens(
      newUser.id,
      newUser.email,
    );
    await this.jwtTokenService.updateRtHash(newUser.id, tokens.refreshToken);

    return tokens;
  }

  public async login(dto: AuthDto) {
    const user = await this.repository.foundUser(dto);

    if (!user) {
      throw new NotFoundException('User are not exist!');
    }

    const passwordMatches = await bcrypt.compare(dto.password, user.password);

    if (!passwordMatches) {
      throw new UnauthorizedException('Access denied! Incorrect password!');
    }
    const tokens = await this.jwtTokenService.signTokens(user.id, user.email);
    await this.jwtTokenService.updateRtHash(user.id, tokens.refreshToken);
    return tokens;
  }

  public async validateUser(email: string) {
    const user = await this.repository.foundUserGoogle(email);
    if (!user) {
      await this.prisma.user.create({
        data: { email: email, password: '' },
      });
    }
    const tokens = await this.jwtTokenService.signTokens(user.id, user.email);
    await this.jwtTokenService.updateRtHash(user.id, tokens.refreshToken);
    return tokens;
  }

  public async signOut(userId: number): Promise<void> {
    await this.repository.signOut(userId);
  }

  public async hashData(data: string): Promise<string> {
    const saltOrRounds = Constants.roundOfSalt;
    return await bcrypt.hash(data, saltOrRounds);
  }
}
