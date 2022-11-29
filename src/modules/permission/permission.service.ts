import { Injectable } from '@nestjs/common'
import { CreatePermissionDto } from './dto/create-permission.dto'
import { UpdatePermissionDto } from './dto/update-permission.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Permission } from './entities/permission.entity'
import { Repository } from 'typeorm'
@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private readonly repository: Repository<Permission>,
  ) {}

  create(createAuthDto: CreatePermissionDto) {
    return this.repository.insert(createAuthDto)
  }

  findAll() {
    return this.repository.createQueryBuilder().getMany()
  }

  findOne(id: number) {
    return this.repository.findOneBy({ id })
  }

  update(id: number, updatePermissionDto: UpdatePermissionDto) {
    return this.repository.update(id, updatePermissionDto)
  }

  remove(id: number) {
    return this.repository.delete(id)
  }
}
