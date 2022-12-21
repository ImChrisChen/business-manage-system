import { Injectable } from '@nestjs/common'
import { UserService } from '../user/user.service'
import { User } from '../user/entities/user.entity'
import { sha256 } from '../../utils'
import { JwtService } from '@nestjs/jwt'
import { SystemExceptionFilter } from '../../common/filters/system-exception.filter'
import { ResponseCodes } from '../../config'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user) {
    console.log('user:', user)
    if (!user) {
      throw new SystemExceptionFilter(ResponseCodes.USER_NOT_EXIST)
    }
    const accessToken = this.genAccessToken({
      username: user.username,
      id: user.id,
    })
    user['access_token'] = accessToken
    return user
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
