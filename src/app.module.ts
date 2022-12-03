import { Module } from '@nestjs/common'
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
dotenv.config()

const isDevelopment = process.env.NODE_ENV === 'development'
const { DB_PORT, DB_HOST, DB_DATABASE, DB_PASSWORD, DB_USERNAME } = process.env

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
  providers: [AppService],
})
export class AppModule {
  constructor() {}
}
