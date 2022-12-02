import { HttpException, HttpStatus, Injectable } from '@nestjs/common'

/**
 * 跳过全局拦截器
 */
@Injectable()
export class SkipHttpResponseFilter extends HttpException {
  public isSkipGlobalInterceptor = true
  constructor(options) {
    super(options, HttpStatus.OK)
  }
}
