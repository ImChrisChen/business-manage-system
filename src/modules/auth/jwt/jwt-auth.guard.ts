/**
 * Created by WebStorm.
 * User: chrischen
 * Date: 2022/9/7
 * Time: 00:10
 */
import { AuthGuard } from '@nestjs/passport'
import { ExecutionContext, Injectable } from '@nestjs/common'
import { Observable } from 'rxjs'

/**
 * 验证Jwt身份(用户相关的接口需要)
 *
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor() {
    super()
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context)
  }
}
