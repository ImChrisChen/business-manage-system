/**
 * Created by WebStorm.
 * User: chrischen
 * Date: 2022/9/7
 * Time: 00:10
 */
import { AuthGuard } from '@nestjs/passport'
import { Reflector } from '@nestjs/core'
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { IS_PUBLIC_KEY } from '../contants'

/**
 * 跳过JWT权限验证
 * @param context
 * @param reflector
 */
export const shouldBypassJwtAuth = (
  context: ExecutionContext,
  reflector: Reflector,
): boolean => {
  return reflector.get(IS_PUBLIC_KEY, context.getHandler())
}

/**
 * 验证Jwt身份(用户相关的接口需要)
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super()
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isBypassAuth = shouldBypassJwtAuth(context, this.reflector)
    // const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler())
    if (isBypassAuth) {
      return true
    }

    // Add your custom authentication logic here
    // for example, call super.logIn(request) to establish a session.
    return super.canActivate(context)
  }

  handleRequest(err, user, info) {
    // You can throw an exception based on either "info" or "err" arguments
    if (err || !user) {
      throw err || new UnauthorizedException()
    }
    return user
  }
}
