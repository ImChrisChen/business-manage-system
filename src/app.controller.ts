import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common'
import { AppService } from './app.service'
import * as process from 'process'
import { SkipJwtAuth } from './modules/auth/contants'
import { SkipHttpResponseFilter } from './common/filters/skip-http-response.filter'
import { Request, Response } from 'express'
import { CreateUserDto } from './modules/user/dto/create-user.dto'
import { AuthService } from './modules/auth/auth.service'
import { SystemExceptionFilter } from './common/filters/system-exception.filter'
import { ResponseCodes } from './config'
import { UserService } from './modules/user/user.service'
import { AuthGuard } from '@nestjs/passport'

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @SkipJwtAuth()
  @Get()
  getIndex() {
    return new SkipHttpResponseFilter(process.versions)
  }

  @SkipJwtAuth()
  @Post('/register')
  register(@Body() body: CreateUserDto, @Req() req: Request) {
    const { username = '', password = '' } = body
    if (!username || !password) {
      throw new SystemExceptionFilter(ResponseCodes.USERNAME_OR_PASSWORD_EMPTY)
    }
    return this.userService.create(body)
  }

  @UseGuards(AuthGuard('local'))
  @SkipJwtAuth()
  @Post('/login')
  async login(
    @Body() body: CreateUserDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.authService.login(req.user)
    res.cookie('access_token', user['access_token'], {
      maxAge: Date.now() + 1000 * 60,
      httpOnly: true,
    })
    return user
  }

  @SkipJwtAuth()
  @Post('/logout')
  logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    res.cookie('access_token', '')
  }
}
