import { Injectable } from '@nestjs/common'
import { UserService } from '../user/user.service'
import { User } from '../user/entities/user.entity'
import { sha256 } from '../../utils'
import { JwtService } from '@nestjs/jwt'
import { SystemExceptionFilter } from '../../common/filters/system-exception.filter'
import { ResponseCodes } from '../../config'
import { UserLoginLogService } from '../user_login_log/user_login_log.service'
import { CreateUserLoginLogDto } from '../user_login_log/dto/create-userloginlog.dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly userLoginLogService: UserLoginLogService,
  ) {}

  async login(user, { ip, userAgent }) {
    console.log('user:', user)
    console.log('ip:', ip)
    const log: CreateUserLoginLogDto = {
      login_way: 'username_password', // TODO 登录方式待写入JWT判断
      client_ip: ip,
      user_agent: userAgent,
      login_status: 1,
      device: '',
      platform: '',
    }

    if (!user) {
      // log.login_status = 0 // 登录失败
      // await this.userLoginLogService.create(user.userId, log)
      throw new SystemExceptionFilter(ResponseCodes.USER_NOT_EXIST)
    }

    const accessToken = this.genAccessToken({
      username: user.username,
      id: user.id,
    })
    user['access_token'] = accessToken
    await this.userLoginLogService.create(user.id, log)
    return user
  }

  async logout(user) {
    const date = new Date()
    const logout_time =
      date.toLocaleDateString().split('/').join('-') + date.toLocaleTimeString()
    return this.userLoginLogService.update(user.userId, { logout_time })
  }

  /**
   * 生成 access_token
   * @param user
   */
  genAccessToken({ username, id }): string {
    const payload = {
      username: username,
      sub: id,
    }
    return this.jwtService.sign(payload)
  }

  async validateUser(
    username: string,
    password: string,
  ): Promise<Omit<User, 'password'>> {
    const [user, pwd] = await this.userService.findOne({
      username: username,
      is_del: 0,
    })
    if (!user) {
      throw new SystemExceptionFilter(ResponseCodes.USER_NOT_EXIST)
    }
    // TODO 用户密码要加salt，salt如何设计
    const hashedPassword = sha256(password)
    if (user && pwd === hashedPassword) {
      Reflect.deleteProperty(user, 'password')
      return user
    } else {
      throw new SystemExceptionFilter(
        ResponseCodes.USERNAME_OR_PASSWORD_INCORRECT,
      )
    }
  }
}
