import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from "../user/user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../user/entities/user.entity";
import { LocalStrategy } from "./local.strategy";
import { PassportModule } from "@nestjs/passport";

@Module({
  imports: [PassportModule,TypeOrmModule.forFeature([User])],
  providers: [AuthService,UserService, LocalStrategy]
})
export class AuthModule {}
