import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { DataSource, Repository } from "typeorm";
import { Role } from "../role/entities/role.entity";
import { sha256 } from "../../utils";
import { SystemExceptionFilter } from "../../common/filters/system-exception.filter";
import { ResponseCodes } from "../../config";
import { FindOneUserOptions } from "./interface";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly dataSource: DataSource
  ) {
  }
  async create(createUserDto: CreateUserDto) {
    const { username, password } = createUserDto
    const hashPassword = sha256(password)
    const [user] = await this.dataSource.query(`select * from user where name = 'admin' and is_del != 1 limit 1`)
    if (user) {
      throw new SystemExceptionFilter(ResponseCodes.USER_EXIST)
    }

    let sql = `insert into user(name,password, role_id) values("${username}", "${hashPassword}", 1)`
    return this.dataSource.query(sql)

    // this.userRepository.createQueryBuilder('user')
    // let res = this.userRepository.createQueryBuilder('user').insert().into(User).values([
    //   {
    //     name    : username,
    //     password: hashPassword,
    //     sex     : "1",
    //     role_id : 1
    //   }
    // ]).printSql().execute()
    // return res
  }

  findAll() {
    return this.userRepository.createQueryBuilder("user").leftJoinAndSelect(Role, "role", "user.role_id =" +
      " role.id").getRawMany()
    // return this.userRepository.find()
  }

  async findOne(where: FindOneUserOptions) {
    const user = await this.userRepository.findOneBy({ ...where, is_del: 0 })
    if (!user) {
      throw new SystemExceptionFilter(ResponseCodes.USER_NOT_EXIST)
    }
    return user
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    // 缺少更新的参数
    if (Object.keys(updateUserDto).length === 0) {
      throw new SystemExceptionFilter(ResponseCodes.MISSING_PARAMETERS)
    }

    // if (!isVaildParams) {
    //   throw new SystemExceptionFilter(ResponseCodes.PARAMETERS_INCORRECT)
    // }

    return this.userRepository.update(id, {
      ...updateUserDto,
    })
  }

  // 软删除
  sortRemove(id: number) {
    return this.dataSource.query(`update user set is_del=1 where id=${id}`)
  }

  remove (id: number) {
    return this.userRepository.delete(id)
  }

  login(loginUserDto: CreateUserDto , session) {
    const { username,password} = loginUserDto
    const hashPassword = sha256(password)
    const user = this.dataSource.query(`select * from user where name="${username}" and password="${hashPassword}" and is_del<>1 limit 1`)
    if (!user) {
      throw new SystemExceptionFilter(ResponseCodes.USERNAME_OR_PASSWORD_INCORRECT)
    }
    console.log('session:',session);
    return user
  }
}
