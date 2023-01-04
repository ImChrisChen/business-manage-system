import { Injectable } from '@nestjs/common'
import { CreateBuynoteTypeDto } from './dto/create-buynote_type.dto'
import { UpdateBuynoteTypeDto } from './dto/update-buynote_type.dto'
import { Repository } from 'typeorm'
import { BuynoteType } from './entities/buynote_type.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { SystemExceptionFilter } from '../../common/filters/system-exception.filter'
import { ResponseCodes } from '../../config'
import { listToTree } from '../../utils'

@Injectable()
export class BuynoteTypeService {
  constructor(
    @InjectRepository(BuynoteType)
    private readonly repository: Repository<BuynoteType>,
  ) {}
  create(createBuynoteTypeDto: CreateBuynoteTypeDto) {
    let type = new BuynoteType()
    type = this.repository.merge(type, createBuynoteTypeDto)
    return this.repository.save(type)
  }

  async findAll() {
    const list = await this.repository
      .createQueryBuilder()
      .setFindOptions({ relations: ['buynotes'] })
      .getMany()
    const treeList = listToTree(list, {
      id: 'id',
      pid: 'pid',
      children: 'children',
    })
    return treeList
  }

  async findOne(id: number) {
    const type = await this.repository.find({
      where: { id },
      relations: ['buynotes'],
    })
    if (!type) {
      return new SystemExceptionFilter(ResponseCodes.RESOURCE_NOT_FOUND)
    }
    return type
  }

  async update(id: number, updateBuynoteTypeDto: UpdateBuynoteTypeDto) {
    let type = await this.repository.findOneBy({ id })
    type = this.repository.merge(type, updateBuynoteTypeDto)
    return this.repository.save(type)
  }

  remove(id: number) {
    return this.repository.delete(id)
  }
}
