import { Inject, Injectable } from '@nestjs/common';
import { AuthDto } from './dto';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { LOGIN, REFRESH, REGISTER, SIGNOUT, VALIDATE_USER } from './constants';

@Injectable()
export class AuthService {
  constructor(@Inject('AUTH') private authClient: ClientProxy) {}

  public async register(dto: AuthDto) {
    return await lastValueFrom(this.authClient.send(REGISTER, { dto }));
  }

  public async login(dto: AuthDto) {
    return await lastValueFrom(this.authClient.send(LOGIN, { dto }));
  }

  public async signOut(userId: number) {
    return await lastValueFrom(this.authClient.send(SIGNOUT, { userId }));
  }

  public async refreshTokens(userId: number, refreshToken: string) {
    return await lastValueFrom(
      this.authClient.send(REFRESH, { userId, refreshToken }),
    );
  }

  public async validateUser(email: string) {
    return await lastValueFrom(this.authClient.send(VALIDATE_USER, { email }));
  }
}
