import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { Request } from 'express'
import { isString } from 'class-validator'

export const GetClientIp = createParamDecorator(
  (data, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest()
    const headers = request.headers
    let ip =
      headers?.['x-real-ip'] ||
      headers?.['x-forwarded-for'] ||
      request.socket.remoteAddress ||
      ''

    if (isString(ip) && ip.split(',').length > 0) {
      ip = ip.split(',')[0]
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    ip = ip.substr(ip.lastIndexOf(':') + 1, ip.length)

    return ip
  },
)
export const GetUserAgent = createParamDecorator(
  (data, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest()
    return request.headers?.['user-agent'] || ''
  },
)
