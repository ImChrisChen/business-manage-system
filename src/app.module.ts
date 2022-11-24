import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { GoodsModule } from './modules/goods/goods.module';
import { RoleModule } from './modules/role/role.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { PermissionModule } from './modules/permission/permission.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'chrisorz.tpddns.cn',
      port: 3306,
      username: 'root',
      password: 'rootadmin',
      database: 'goods_store',
      // entities: [User],
      autoLoadEntities: true,
      synchronize: false,
      retryDelay: 1500,
      retryAttempts: 10,
    }),
    UserModule,
    AuthModule,
    GoodsModule,
    RoleModule,
    PermissionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
