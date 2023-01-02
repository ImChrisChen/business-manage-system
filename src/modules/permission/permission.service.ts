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

  /**
   * 查询所有的权限
   * @param whereOptions 查询条件
   * @param queryFields
   */
  findAll(
    whereOptions?: { role_id: number },
    queryFields: Array<keyof Permission> = [],
  ): Promise<Array<Permission>> {
    const { role_id } = whereOptions
    if (role_id) {
      const sql = `
      select CONCAT_WS('.', permission, permission_type) permission_name
      ${queryFields.length > 0 ? ',' + queryFields.join(',') : ''}
      from permission
where id in (select permission_id from role_to_permission where role_id = ${role_id})
      `
      return this.repository.query(sql)
    }
    return (
      this.repository
        .createQueryBuilder()
        // .setFindOptions({
        //   relations: ['roles'],
        // })
        .getMany()
    )
  }

  async findOne(id: number) {
    return this.repository.findOneBy({ id })
  }

  update(id: number, updatePermissionDto: UpdatePermissionDto) {
    return this.repository.update(id, updatePermissionDto)
  }

  remove(id: number) {
    return this.repository.delete(id)
  }
}
