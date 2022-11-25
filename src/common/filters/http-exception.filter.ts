/**
 * Created by WebStorm.
 * User: chrischen
 * Date: 2022/9/2
 * Time: 00:41
 */
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common'
import { Request } from 'express'
import { BaseExceptionFilter } from '@nestjs/core'

/**
 * @Catch(HttpException) 表示只过滤HttpException类型的错误，其他错误走内置的全局 exception
 * https://github.com/nestjs/nest/issues/538
 */
@Catch(HttpException)
export class HttpExceptionFilter
  extends BaseExceptionFilter
  implements ExceptionFilter
{
  constructor() {
    super()
  }
  catch(exception: HttpException, host: ArgumentsHost): any {
    const status = exception.getStatus()
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()

    // SystemException
    const res = exception['response']
    if ('code' in res && 'msg' in res) {
      // @ts-ignore
      response.status(200).json({
        code: res.code,
        msg: res.msg,
        data: {},
      })
    }

    // 没匹配到则走默认的过滤器 https://github.com/nestjs/nest/pull/908
    super.catch(exception, host)
  }
}
