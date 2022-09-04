import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from "../user/user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../user/entities/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [AuthService,UserService]
})
export class AuthModule {}
