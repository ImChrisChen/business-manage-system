import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as cookieParser from 'cookie-parser'
import * as session from 'express-session'
import * as passport from 'passport'

import { HttpResponseInterceptor } from './common/interceptors'
import { ValidationPipe } from '@nestjs/common'

const isDevelopEnv = process['NODE_ENV'] === 'development'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', isDevelopEnv ? 'debug' : undefined],
  })
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: false,
    }),
  ) // 全局管道验证器(配置class-validator 类验证装饰器一起使用)
  app.useGlobalInterceptors(new HttpResponseInterceptor()) // http-response 全局拦截器

  app.use(cookieParser())
  app.use(session({ secret: 'SECRET' }))
  app.use(passport.initialize())
  app.use(passport.session())

  await app.listen(3001)
}
bootstrap()
