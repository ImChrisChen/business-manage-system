import {
  Body,
  CacheInterceptor,
  CacheKey,
  CacheTTL,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { AppService } from './app.service'
import { SkipJwtAuth } from './modules/auth/contants'
import { Request, Response } from 'express'
import { CreateUserDto } from './modules/user/dto/create-user.dto'
import { AuthService } from './modules/auth/auth.service'
import { SystemExceptionFilter } from './common/filters/system-exception.filter'
import { ResponseCodes } from './config'
import { UserService } from './modules/user/user.service'
import { AuthGuard } from '@nestjs/passport'

@UseInterceptors(CacheInterceptor)
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  // @CacheKey('index-model')
  // @CacheTTL(10)
  @SkipJwtAuth()
  @Get()
  getIndex() {
    return this.appService.getIndex()
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
