import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common'
import { Observable, tap } from 'rxjs'
import { Logger } from 'winston'
import * as moment from 'moment'

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(@Inject('winston') private readonly logger: Logger) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest<Request>()
    const { method, url, referrer, headers } = request
    const userAgent = headers['user-agent']
    const host = headers['host']
    return next.handle().pipe(
      tap(() => {
        this.logger.info('request', {
          datetime: moment().format('YYYY-MM-DD HH:mm:ss'),
          host,
          method,
          url,
          userAgent,
          referrer,
        })
      }),
    )
  }
}
