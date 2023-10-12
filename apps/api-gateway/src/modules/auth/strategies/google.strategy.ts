import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(@Inject('AUTH_SERVICE') private authService: AuthService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3001/auth/google-redirect',
      scope: ['email', 'profile'],
    });
  }
  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    Logger.log(accessToken, refreshToken);
    Logger.log(profile);
    Logger.log(`profile email: ${profile.emails[0].value}, ${accessToken}`);
    const user = await this.authService.validateUser(profile.emails[0].value);
    user.email = profile.emails[0].value;
    Logger.log(`User Info: ${user}`);
    return user || null;
  }
}
