import { Global, Module } from "@nestjs/common";
import { AuthService } from './auth.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../user/entities/user.entity";
import { LocalStrategy } from "./local.strategy";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./contants";
import { JwtStrategy } from "./jwt/jwt.strategy";
import { PassportModule } from "@nestjs/passport";

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({
      defaultStrategy: 'jwt',
      session: false,
    }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService, LocalStrategy,JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
