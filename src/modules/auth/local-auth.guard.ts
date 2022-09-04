/**
 * Created by WebStorm.
 * User: chrischen
 * Date: 2022/9/4
 * Time: 22:44
 */

import { AuthGuard } from "@nestjs/passport";
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";

@Injectable()
// export class LocalAuthGuard extends AuthGuard('local') {
// }
export class LocalAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    console.log(context);
    return true
  }
}
