import { LoginWay } from '../entities/user_login_log.entity'

export class CreateUserLoginLogDto {
  login_way: LoginWay
  client_ip: string
  user_agent: string
  device: string
  platform: string
  login_status: number
}

export class UpdateUserLoginLogDto {
  logout_time: string
}
