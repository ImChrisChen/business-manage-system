import { PartialType } from '@nestjs/mapped-types'
import { CreateUserDto } from './create-user.dto'
import { IsEmail, IsIn, IsMobilePhone, IsOptional, IsString } from 'class-validator'

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsString()
  username?: string

  @IsOptional()
  @IsEmail()
  email?: string

  @IsOptional()
  @IsMobilePhone()
  phone?: string

  @IsOptional()
  @IsIn(['0', '1', '-1']) // 这里要写字符串(body传入数字)
  sex?: 0 | 1 | -1
}
