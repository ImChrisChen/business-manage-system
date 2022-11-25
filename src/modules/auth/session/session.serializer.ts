/**
 * Created by WebStorm.
 * User: chrischen
 * Date: 2022/9/5
 * Time: 22:09
 */
import { Injectable } from '@nestjs/common'
import { PassportSerializer } from '@nestjs/passport'

@Injectable()
export class SessionSerializer extends PassportSerializer {
  deserializeUser(payload: any, done: Function): any {
    console.log('payload:', payload)
    done(null, payload)
  }

  /**
   * 登录时触发
   * @param user
   * @param done
   */
  serializeUser(user: any, done: Function): any {
    console.log('user:', user)
    done(null, user)
  }
}
