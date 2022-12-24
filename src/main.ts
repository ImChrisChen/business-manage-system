import { NestFactory, Reflector } from '@nestjs/core'
import { AppModule } from './app.module'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import * as cookieParser from 'cookie-parser'
import * as session from 'express-session'
import * as passport from 'passport'
import { ValidationPipe } from '@nestjs/common'
import { JwtAuthGuard } from './modules/auth/jwt/jwt-auth.guard'
import { isDevelopment } from './config/env'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', isDevelopment ? 'debug' : undefined],
  })

  app.enableCors({
    origin: [/http:\/\/127.0.0.1:*/, /http:\/\/chrisorz.tpddns.cn:*/],
  })

  // 设置 Swagger文档
  const options = new DocumentBuilder()
    .setTitle('Goods Store Api v1')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('docs', app, document)

  // 全局前缀
  app.setGlobalPrefix('/api/v1')

  // 全局管道验证器(配置class-validator 类验证装饰器一起使用)
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     disableErrorMessages: false,
  //   }),
  // )

  // http-response 全局拦截器
  // app.useGlobalInterceptors(new HttpResponseInterceptor())

  // 全局过滤器
  // app.useGlobalFilters(new HttpExceptionFilter())

  // 全局鉴权守卫(jwt)
  // app.useGlobalGuards(new JwtAuthGuard(new Reflector()))

  app.use(cookieParser())
  app.use(session({ secret: 'SECRET' }))
  app.use(passport.initialize())
  app.use(passport.session())

  await app.listen(3003)
}

bootstrap()
