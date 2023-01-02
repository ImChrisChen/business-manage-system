import { Module } from '@nestjs/common'
import { UserLoginLogController } from './user_login_log.controller'
import { UserLoginLogService } from './user_login_log.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserLoginLog } from './entities/user_login_log.entity'

@Module({
  imports: [TypeOrmModule.forFeature([UserLoginLog])],
  controllers: [UserLoginLogController],
  providers: [UserLoginLogService],
  exports: [UserLoginLogService],
})
export class UserLoginLogModule {}
