import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import { HttpResponseInterceptor } from "./common/interceptors";

const isDevelopEnv = process['NODE_ENV'] === 'development'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', isDevelopEnv ? 'debug' : undefined]
  });
  app.use(cookieParser())
  app.use(session({
    secret: 'this_mysecret_goods_store_app',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 60, // unit/second
    }
  }))
  app.useGlobalInterceptors(new HttpResponseInterceptor)    // http-response 全局拦截器
  await app.listen(3001);
}
bootstrap();
