import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { Repository } from 'typeorm'
import { sha256 } from '../../utils'
import { SystemExceptionFilter } from '../../common/filters/system-exception.filter'
import { ResponseCodes } from '../../config'
import { FindOneUserOptions } from './interface'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly repository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const { username, password } = createUserDto
    const hashPassword = sha256(password)

    const user = await this.repository.findOneBy({
      username: username,
      is_del: 0,
    })

    // 用户已被注册
    if (user) {
      throw new SystemExceptionFilter(ResponseCodes.USER_IS_REGISTERED)
    }

    let newUser = await this.repository.create({
      username: username,
      password: hashPassword,
      role_id: 1,
    })
    newUser = await this.repository.save(newUser)
    return this.filterUserPassword(newUser)
  }

  findAll() {
    return this.repository
      .createQueryBuilder()
      .setFindOptions({ relations: ['roles'] })
      .getMany()
      .then((user) => {
        return user.map((item) => this.filterUserPassword(item))
      })
  }

  async findOne(
    where: FindOneUserOptions,
  ): Promise<[Omit<User, 'password'>, string]> {
    const user = await this.repository.findOneBy({ ...where, is_del: 0 })
    if (!user) {
      throw new SystemExceptionFilter(ResponseCodes.USER_NOT_EXIST)
    }
    const { password, ...u } = user
    return [u, password]
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    // 缺少更新的参数
    if (Object.keys(updateUserDto).length === 0) {
      throw new SystemExceptionFilter(ResponseCodes.MISSING_PARAMETERS)
    }

    // if (!isVaildParams) {
    //   throw new SystemExceptionFilter(ResponseCodes.PARAMETERS_INCORRECT)
    // }

    return this.repository.update(id, {
      ...updateUserDto,
    })
  }

  // 软删除
  sortRemove(id: number) {
    // return this.dataSource.query(`update user set is_del=1 where id=${id}`)
    return this.repository.update(id, { is_del: 1 })
  }

  remove(id: number) {
    return this.repository.delete(id)
  }

  // 过滤用户密码
  filterUserPassword(user: User): Omit<User, 'password'> {
    Reflect.deleteProperty(user, 'password')
    return user
  }
}
