/**
 * Created by WebStorm.
 * User: chrischen
 * Date: 2022/9/7
 * Time: 00:14
 */

import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from "../../user/dto/create-user.dto";
import { SystemExceptionFilter } from "../../../common/filters/system-exception.filter";
import { ResponseCodes } from "../../../config";

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  canActivate(context: ExecutionContext): any {
    const body: CreateUserDto = context.switchToHttp().getRequest().body
    console.log('body:', body);
    if (!body.username || !body.password) {
      throw new SystemExceptionFilter(ResponseCodes.MISSING_PARAMETERS)
    }
    return super.canActivate(context)
  }
}
