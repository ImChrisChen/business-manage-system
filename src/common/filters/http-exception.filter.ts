/**
 * Created by WebStorm.
 * User: chrischen
 * Date: 2022/9/2
 * Time: 00:41
 */
import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Request } from "express";

/**
 * @Catch(HttpException) 表示只过滤HttpException类型的错误，其他错误走内置的全局 exception
 * https://github.com/nestjs/nest/issues/538
 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): any {
    const status = exception.getStatus();
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // SystemException
    const res = exception['response']
    if ('code' in res && 'msg' in res) {
      // @ts-ignore
      response.status(200).json({
        code: res.code,
        msg: res.msg,
        data: {}
      })
    } else {
      response
        // @ts-ignore
        .status(status)
        .json({
          statusCode: status,
          timestamp: new Date().toISOString(),
          path: request.url,
        });
      }
  }
}
