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
import * as process from 'process'
import * as dotenv from 'dotenv'
import { WinstonModule } from 'nest-winston'
import * as winston from 'winston'
import 'winston-daily-rotate-file'
import { HttpResponseInterceptor } from './common/interceptors'
import { LoggingInterceptor } from './common/interceptors/logging.interceptor'
import { APP_INTERCEPTOR } from '@nestjs/core'
import * as redisStore from 'cache-manager-redis-store'

dotenv.config()

const isDevelopment = process.env.NODE_ENV === 'development'
const { DB_PORT, DB_HOST, DB_DATABASE, DB_PASSWORD, DB_USERNAME } = process.env

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
      retryDelay: 1500,
      retryAttempts: 10,
    }),
    WinstonModule.forRoot({
      transports: [transport],
    }),
    CacheModule.register({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      store: redisStore,
      host: 'chrisorz.tpddns.cn',
      port: 6379,
      ttl: 2000, // 单位 s ，key的过期时间
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
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {
  constructor() {}
}
