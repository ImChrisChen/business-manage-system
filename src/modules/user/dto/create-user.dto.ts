import { IsNotEmpty } from 'class-validator'

export class CreateUserDto {
  @IsNotEmpty({ message: 'username is required' })
  username: string //  有可能是手机号,邮箱等

  @IsNotEmpty({ message: 'password is required' })
  password: string
}
