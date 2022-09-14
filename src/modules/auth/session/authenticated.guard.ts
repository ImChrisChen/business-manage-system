/**
 * Created by WebStorm.
 * User: chrischen
 * Date: 2022/9/5
 * Time: 22:06
 */
import { CanActivate, ExecutionContext } from "@nestjs/common";

/**
 * 请求的时候验证cookie
 */
export class AuthenticatedGuard implements CanActivate{
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest()
    console.log('session:', request.sessionID);
    return request.isAuthenticated()
  }
}
