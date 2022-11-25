/**
 * Created by WebStorm.
 * User: chrischen
 * Date: 2022/9/7
 * Time: 00:10
 */
import { AuthGuard } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'

/**
 * 验证Jwt身份(用户相关的接口需要)
 *
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
