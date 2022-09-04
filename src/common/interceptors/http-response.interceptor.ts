/**
 * Created by WebStorm.
 * User: chrischen
 * Date: 2022/9/1
 * Time: 00:10
 */
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";

interface HttpResponse<T extends any> {
  code: number
  data: T
  msg: string
}

@Injectable()
export class HttpResponseInterceptor implements NestInterceptor {

  async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<HttpResponse<any>>> {
    return next.handle().pipe(
      map(data => {
        return {
          code: 0,
          data: data,
          msg: 'ok',
        }
      })
    )
  }
}
