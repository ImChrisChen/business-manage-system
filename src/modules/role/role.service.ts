import { Injectable } from '@nestjs/common'
import { CreateRoleDto } from './dto/create-role.dto'
import { UpdateRoleDto } from './dto/update-role.dto'
import { Repository } from 'typeorm'
import { Role } from './entities/role.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { SystemExceptionFilter } from '../../common/filters/system-exception.filter'
import { ResponseCodes } from '../../config'

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    let role = new Role()
    role = this.roleRepository.merge(role, createRoleDto)
    return this.roleRepository.save(role)
  }

  findAll() {
    return this.roleRepository
      .createQueryBuilder()
      .setFindOptions({
        relations: ['permissions'],
      })
      .getMany()
      .then((list) => {
        return list.map((item) => {
          const permissions = item.permissions.map(
            (it) => `${it.permission}.${it.permission_type}`,
          )
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          item.permissions = permissions
          return item
        })
      })
  }

  findOne(id: number) {
    return this.roleRepository
      .createQueryBuilder()
      .setFindOptions({
        relations: ['permissions'],
      })
      .where({ id: id })
      .getOne()
      .then((res) => {
        const permissions = res.permissions.map(
          (item) => `${item.permission}.${item.permission_type}`,
        )
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        res.permissions = permissions
        return res
      })
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return this.roleRepository.update(id, updateRoleDto)
  }

  async remove(id: number) {
    const res = await this.roleRepository.delete(id)
    if (res.affected) {
      return new SystemExceptionFilter(ResponseCodes.OK)
    }
    return new SystemExceptionFilter(ResponseCodes.OK, '资源不存在,删除失败')
  }
}
