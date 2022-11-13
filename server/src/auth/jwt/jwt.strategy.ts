import { env } from 'process';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Payload } from './jwt.payload';
import { Repository } from 'typeorm';
import { User } from 'src/user/user.entity';
import { AuthService } from '../auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          return req?.cookies?.Authentication;
        },
      ]),
      secretOrKey: env.JWT_SECRET,
      ignoreExpiration: false,
    });
  }

  //jwt 인증하는부분
  async validate(payload: Payload) {
    const user = await this.authService.findUserByWithoutPassword(payload.sub);
    if (user) {
      return user; //reuset.user에 들어감
    } else {
      throw new UnauthorizedException('접근 오류');
    }
  }
}
