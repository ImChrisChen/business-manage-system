/**
 * Created by WebStorm.
 * User: chrischen
 * Date: 2022/9/1
 * Time: 00:10
 */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common'
import { map, Observable } from 'rxjs'

interface HttpResponse<T> {
  code: number
  data: T
  msg: string
}

@Injectable()
export class HttpResponseInterceptor implements NestInterceptor {
  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<HttpResponse<any>>> {
    return next.handle().pipe(
      map((data) => {
        // 业务状态
        if (data?.isSystemExceptionError) {
          return {
            code: data.response.code,
            data: data.response.data,
            msg: data.response.msg,
          }
        } else if (data?.isSkipGlobalInterceptor) {
          // 跳过全局拦截器
          return data.response
        } else {
          return {
            code: 0,
            data: data,
            msg: 'ok',
          }
        }
      }),
    )
  }
}
