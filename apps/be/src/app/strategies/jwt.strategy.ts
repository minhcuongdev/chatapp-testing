import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: any) => request?.cookies?.jwt,
      ]),
      secretOrKey: 'secret', // Replace with a secure secret in production
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email };
  }
}
