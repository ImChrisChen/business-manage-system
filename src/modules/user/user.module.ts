import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { PermissionService } from '../permission/permission.service'
import { Permission } from '../permission/entities/permission.entity'

@Module({
  imports: [TypeOrmModule.forFeature([User, Permission])],
  controllers: [UserController],
  providers: [UserService, PermissionService],
  exports: [UserService],
})
export class UserModule {}
