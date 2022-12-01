import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Res,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { Request, Response } from 'express'
import { SystemExceptionFilter } from '../../common/filters/system-exception.filter'
import { ResponseCodes } from '../../config'
import { LocalAuthGuard } from '../auth/jwt/local-auth.guard'
import { AuthService } from '../auth/auth.service'
import { SkipJwtAuth } from '../auth/contants'
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard'

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @SkipJwtAuth()
  @Post('/register')
  register(@Body() body: CreateUserDto, @Req() req: Request) {
    req.session
    debugger
    const { username = '', password = '' } = body
    if (!username || !password) {
      throw new SystemExceptionFilter(ResponseCodes.USERNAME_OR_PASSWORD_EMPTY)
    }
    return this.userService.create(body)
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(
    @Body() body: CreateUserDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    console.log(req.user)
    debugger
    const user = await this.authService.login(req.user)
    res.cookie('access_token', user['access_token'], {
      maxAge: Date.now() + 1000 * 60,
    })
    console.log('/login:', user)
    return user
  }

  @Post('/logout')
  logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    res.cookie('access_token', '')
  }

  @UseGuards(JwtAuthGuard)
  @Get('/userinfo')
  getUserInfo(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return this.userService.findAll()
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const [user] = await this.userService.findOne({ id: Number(id) })
    if (!user) {
      throw new SystemExceptionFilter(ResponseCodes.USER_NOT_EXIST)
    }
    return user
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    console.log(updateUserDto)
    return this.userService.update(+id, updateUserDto)
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.sortRemove(+id)
  }
}
