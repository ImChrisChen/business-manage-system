import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserLoginLog } from './entities/user_login_log.entity'
import { Repository } from 'typeorm'
import { CreateUserLoginLogDto } from './dto/create-userloginlog.dto'

@Injectable()
export class UserLoginLogService {
  constructor(
    @InjectRepository(UserLoginLog)
    private readonly repository: Repository<UserLoginLog>,
  ) {}

  getAll(user_id: number) {
    return this.repository
      .createQueryBuilder()
      .setFindOptions({
        where: { user_id: user_id },
      })
      .getMany()
  }

  create(user_id: number, body?: CreateUserLoginLogDto) {
    const log = this.repository.create({
      user_id: user_id,
      ...body,
    })
    return this.repository.save(log)
  }
}
