import * as process from 'process';
import { Request } from 'express';
import { Injectable } from '@nestjs/common';
import { Payload } from '../types';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([RtStrategy.extractJWT]),
      secretOrKey: process.env.RTSECRET,
      passReqToCallback: true,
    });
  }

  private static extractJWT(req: Request): string | null {
    if (req.cookies && 'refreshToken' in req.cookies) {
      return req.cookies.refreshToken;
    }
    return null;
  }

  validate(req: Request, payload: Payload) {
    const refreshToken = req.cookies.refreshToken;
    return { ...payload, refreshToken };
  }
}
