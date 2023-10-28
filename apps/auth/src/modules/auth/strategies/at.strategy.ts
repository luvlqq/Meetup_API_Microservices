import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as process from 'process';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([AtStrategy.extractJWT]),
      secretOrKey: process.env.ATSECRET,
    });
  }

  private static extractJWT(req: Request): string | null {
    if (req.cookies && 'accessToken' in req.cookies) {
      return req.cookies.accessToken;
    }
    return null;
  }

  validate(payload: { email: string }) {
    return payload;
  }
}
