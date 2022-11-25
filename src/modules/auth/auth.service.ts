import { Global, HttpException, Injectable } from '@nestjs/common'
import { UserService } from '../user/user.service'
import { User } from '../user/entities/user.entity'
import { sha256 } from '../../utils'
import { JwtService } from '@nestjs/jwt'
import { SystemExceptionFilter } from '../../common/filters/system-exception.filter'
import { ResponseCodes } from '../../config'
import { CreateUserDto } from '../user/dto/create-user.dto'

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async login(user) {
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

  async validateUser(username: string, password: string): Promise<Omit<User, 'password'>> {
    const [user, pwd] = await this.userService.findOne({ username: username })
    console.log('validateUser:', user)
    if (!user) {
      throw new SystemExceptionFilter(ResponseCodes.USER_NOT_EXIST)
    }
    const hashedPassword = sha256(password)
    if (user && pwd === hashedPassword) {
      Reflect.deleteProperty(user, 'password')
      return user
    }
    throw new SystemExceptionFilter(ResponseCodes.USERNAME_OR_PASSWORD_INCORRECT)
  }
}
