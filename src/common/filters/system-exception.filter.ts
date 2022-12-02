/**
 * Created by WebStorm.
 * User: chrischen
 * Date: 2022/9/2
 * Time: 22:23
 */
import { HttpException, HttpStatus } from '@nestjs/common'

/**
 * 业务层特殊返回处理(自定义返回msg和code)
 * 在拦截器中处理异常逻辑
 */
export class SystemExceptionFilter extends HttpException {
  public isSystemExceptionError = true
  constructor(options: [number, string] | any, data = {}, msg?: string) {
    const [code, defaultMsg] = options
    super(
      {
        code: code,
        data: data,
        msg: msg || defaultMsg,
      },
      HttpStatus.OK,
    )
    // this.is_system_exception_error = code !== 0
  }
}
