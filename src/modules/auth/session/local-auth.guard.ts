/**
 * Created by WebStorm.
 * User: chrischen
 * Date: 2022/9/4
 * Time: 22:44
 */

import { AuthGuard } from '@nestjs/passport'
import { ExecutionContext, Injectable } from '@nestjs/common'

/**
 * 登录时触发
 */
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext) {
    const result = super.canActivate(context) as boolean
    const request = context.switchToHttp().getRequest()
    let res = await super.logIn(request)
    console.log('login:', res)
    return result
  }
}
