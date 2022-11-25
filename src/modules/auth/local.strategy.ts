/**
 * Created by WebStorm.
 * User: chrischen
 * Date: 2022/9/4
 * Time: 22:33
 */
import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { AuthService } from './auth.service'
import { SystemExceptionFilter } from '../../common/filters/system-exception.filter'
import { ResponseCodes } from '../../config'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'username',
      passwordField: 'password',
    })
  }

  /**
   * 验证用户名密码
   * @param username
   * @param password
   */
  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password)
    console.log('validate: ', user)
    if (!user) {
      throw new SystemExceptionFilter(ResponseCodes.USER_NOT_EXIST)
    }
    return user
  }
}
