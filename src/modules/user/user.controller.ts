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
  UseFilters,
  UseGuards
} from "@nestjs/common";
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request, Response} from "express";
import { HttpExceptionFilter } from "../../common/filters";
import { SystemExceptionFilter } from "../../common/filters/system-exception.filter";
import { ResponseCodes } from "../../config";
import { LocalAuthGuard } from "../auth/jwt/local-auth.guard";
import { AuthService } from "../auth/auth.service";
import { JwtAuthGuard } from "../auth/jwt/jwt-auth.guard";

@UseFilters(HttpExceptionFilter)
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('/register')
  register(@Body() body: CreateUserDto, @Req() req:Request) {
    req.session
    const {username = '', password = ''} = body
    if (!username || !password) {
      throw new SystemExceptionFilter(ResponseCodes.USERNAME_OR_PASSWORD_EMPTY)
    }
    return this.userService.create(body)
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login(@Body() body: CreateUserDto,@Req() req:Request, @Res({passthrough: true}) res: Response) {
    return this.authService.login(req.user)
  }

  @Post('/logout')
  logout() {

  }

  @Get('/userinfo')
  getUserInfo(@Req() req: Request ,@Res({ passthrough: true}) res: Response) {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.userService.findOne({id: Number(id)});
    if (!user) {
      throw new SystemExceptionFilter(ResponseCodes.USER_NOT_EXIST)
    }
    return user
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.sortRemove(+id);
  }
}
