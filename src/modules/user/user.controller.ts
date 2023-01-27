import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common'
import { UserService } from './user.service'
import { UpdateUserDto } from './dto/update-user.dto'
import { SystemExceptionFilter } from '../../common/filters/system-exception.filter'
import { ResponseCodes } from '../../config'
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard'
import { GetUser } from '../../common/decorators'
import { PermissionService } from '../permission/permission.service'

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly permissionService: PermissionService,
  ) {}

  @Get('/userinfo')
  getUserInfo(@GetUser() user) {
    return this.userService
      .findOne({
        id: user.userId,
      })
      .then(async ([userInfo]) => {
        // let permissions = await this.permissionService.findAll({
        //   role_id: userInfo.role_id,
        // })
        // permissions = permissions.map((item) => item['permission_name'])
        // userInfo['permissions'] = permissions
        return userInfo
      })
  }

  @Get()
  getUsers() {
    return this.userService.findAll()
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const [user] = await this.userService.findOne({ id })
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
    return this.userService.update(+id, updateUserDto)
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.sortRemove(id)
  }
}
