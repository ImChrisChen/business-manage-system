/**
 * Created by WebStorm.
 * User: chrischen
 * Date: 2022/9/4
 * Time: 22:33
 */
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Strategy } from "passport-local";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  /**
   * 验证用户名密码
   * @param username
   * @param password
   */
  async vaildate (username: string, password: string):Promise<any> {
    const user = await this.authService.vailddateUser(username,password)
    if (!user) {
      throw new UnauthorizedException()
    }
    return user
  }

}
