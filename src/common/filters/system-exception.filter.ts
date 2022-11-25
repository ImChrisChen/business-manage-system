/**
 * Created by WebStorm.
 * User: chrischen
 * Date: 2022/9/2
 * Time: 22:23
 */
import { HttpException, HttpStatus } from '@nestjs/common'

/**
 * 系统层(业务)异常过滤器
 */
export class SystemExceptionFilter extends HttpException {
  constructor(options: [number, string] | any, msg?: string) {
    const [code, defaultMsg] = options
    super(
      {
        code: code,
        msg: msg || defaultMsg,
      },
      HttpStatus.OK,
    )
  }
}
