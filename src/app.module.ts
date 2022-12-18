import { Module, CacheModule, CacheInterceptor } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './modules/user/user.module'
import { GoodsModule } from './modules/goods/goods.module'
import { RoleModule } from './modules/role/role.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PermissionModule } from './modules/permission/permission.module'
import { AuthModule } from './modules/auth/auth.module'
import { TodoModule } from './modules/todo/todo.module'
import { BuynoteTypeModule } from './modules/buynote_type/buynote_type.module'
import { BuynoteModule } from './modules/buynote/buynote.module'
import { GoodsCategoryModule } from './modules/goods_category/goods_category.module'
import { WinstonModule } from 'nest-winston'
import * as winston from 'winston'
import 'winston-daily-rotate-file'
import { HttpResponseInterceptor } from './common/interceptors'
import { LoggingInterceptor } from './common/interceptors/logging.interceptor'
import { APP_INTERCEPTOR } from '@nestjs/core'
import * as redisStore from 'cache-manager-redis-store'
import { env, isDevelopment } from './config/env'

const {
  DB_PORT,
  DB_HOST,
  DB_DATABASE,
  DB_PASSWORD,
  DB_USERNAME,
  REDIS_HOST,
  REDIS_PORT,
} = env

console.log(REDIS_HOST, REDIS_PORT)

const transport = new winston.transports.DailyRotateFile({
  filename: 'application-%DATE%.log',
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
  dirname: 'logs',
})

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: DB_HOST,
      port: Number(DB_PORT),
      username: DB_USERNAME,
      password: DB_PASSWORD,
      database: DB_DATABASE,
      // entities: [User],
      autoLoadEntities: true,
      synchronize: isDevelopment,
      logging: isDevelopment,
      connectTimeout: 60 * 1000,
      retryDelay: 1500,
      retryAttempts: 10,
    }),
    WinstonModule.forRoot({
      transports: [transport],
    }),
    CacheModule.register({
      host: REDIS_HOST,
      port: Number(REDIS_PORT),
      store: redisStore,
      ttl: 60 * 60 * 24, // s
      max: 100, // 最大缓存数量
      isGlobal: true,
    }),
    UserModule,
    AuthModule,
    GoodsModule,
    RoleModule,
    PermissionModule,
    TodoModule,
    BuynoteTypeModule,
    BuynoteModule,
    GoodsCategoryModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: HttpResponseInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor, // 全局请求日志拦截器
    },
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: CacheInterceptor,
    // },
  ],
})
export class AppModule {
  constructor() {}
}
