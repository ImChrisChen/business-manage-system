import { Global, Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '../user/entities/user.entity'
import { LocalStrategy } from './local.strategy'
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from './contants'
import { JwtStrategy } from './jwt/jwt.strategy'
import { PassportModule } from '@nestjs/passport'
import { UserService } from '../user/user.service'
import { UserLoginLogService } from '../user_login_log/user_login_log.service'
import { UserLoginLog } from '../user_login_log/entities/user_login_log.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserLoginLog]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '2h' },
    }),
  ],
  providers: [
    UserService,
    AuthService,
    LocalStrategy,
    JwtStrategy,
    UserLoginLogService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
