import { createParamDecorator, ExecutionContext } from '@nestjs/common'

/**
 * 用户装饰器，在路由的方法形参中使用
 * @example ```
 *  findOne(@User() user) {
 *    console.log(user.userId, user.userName)
 *  }
 * ```
 */
export const GetUser = createParamDecorator((data, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest()
  return request.user as { userId: number; userName: string }
})
