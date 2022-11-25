/**
 * Created by WebStorm.
 * User: chrischen
 * Date: 2022/9/7
 * Time: 00:00
 */

import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { Strategy } from 'passport-jwt'
import { jwtConstants } from '../contants'
import { Request } from 'express'

// 解决: ERROR [ExceptionsHandler] Unknown authentication strategy "jwt"
// https://stackoverflow.com/questions/60405308/nestjs-passport-jwt-unknown-strategy

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // jwtFromRequest: ExtractJwt.fromHeader('authorization'),
      jwtFromRequest: (req: Request) => {
        return req?.cookies?.['access_token'] || null
      },
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    })
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username }
  }
}
