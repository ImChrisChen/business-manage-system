/**
 * Created by WebStorm.
 * User: chrischen
 * Date: 2022/9/7
 * Time: 00:14
 */

import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  canActivate(context: ExecutionContext): any {
    console.log(context.switchToHttp().getRequest().body);
    return super.canActivate(context)
  }
}
