import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import * as cookieParser from 'cookie-parser'
import * as session from 'express-session'
import * as passport from 'passport'

import { HttpResponseInterceptor } from './common/interceptors'
import { ValidationPipe } from '@nestjs/common'
// import { HttpExceptionFilter } from './common/filters'

const isDevelopEnv = process['NODE_ENV'] === 'development'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', isDevelopEnv ? 'debug' : undefined],
  })

  // 设置 Swagger文档
  const options = new DocumentBuilder().setTitle('Goods Store Api v1').setVersion('1.0').build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api', app, document)

  // 全局前缀
  app.setGlobalPrefix('/api/v1')

  // 全局管道验证器(配置class-validator 类验证装饰器一起使用)
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: false,
    }),
  )

  // http-response 全局拦截器
  app.useGlobalInterceptors(new HttpResponseInterceptor())

  // 全局过滤器
  // app.useGlobalFilters(new HttpExceptionFilter())

  app.use(cookieParser())
  app.use(session({ secret: 'SECRET' }))
  app.use(passport.initialize())
  app.use(passport.session())

  await app.listen(3001)
}
bootstrap()
