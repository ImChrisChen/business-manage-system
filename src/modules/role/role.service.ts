import { Injectable, NotFoundException } from '@nestjs/common'
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
    return this.roleRepository.createQueryBuilder().select('*').getRawMany()
  }

  findOne(id: number) {
    return this.roleRepository.createQueryBuilder().where({ id: id }).getOne()
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
