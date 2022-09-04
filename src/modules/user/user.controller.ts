import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, UseFilters, Session } from "@nestjs/common";
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request, Response} from "express";
import { HttpExceptionFilter } from "../../common/filters";
import { SystemExceptionFilter } from "../../common/filters/system-exception.filter";
import { ResponseCodes } from "../../config";

@UseFilters(HttpExceptionFilter)
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
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

  @Post('/login')
  login(@Body() body: CreateUserDto, @Res() res: Response, @Session() session) {
    const {username,password} = body
    if (!username || !password) {
      throw new SystemExceptionFilter(ResponseCodes.USERNAME_OR_PASSWORD_EMPTY)
    }
    return this.userService.login(body, session)
  }

  @Post('/logout')
  logout() {

  }

  @Get('/userinfo')
  getUserInfo(@Req() req: Request ,@Res({ passthrough: true}) res: Response) {
    let sid = req.cookies['sid']
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userService.findOne({id: Number(id)});
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
