import { Controller, Get, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard'
import { UserLoginLogService } from './user_login_log.service'
import { GetUser } from '../../common/decorators'

@UseGuards(JwtAuthGuard)
@Controller('user_login_log')
export class UserLoginLogController {
  constructor(private readonly userLoginLogService: UserLoginLogService) {}
  @Get()
  getAll(@GetUser() user) {
    return this.userLoginLogService.getAll(user.userId)
  }
}
