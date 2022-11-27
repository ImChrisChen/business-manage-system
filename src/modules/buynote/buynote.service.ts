import { Injectable } from '@nestjs/common'
import { CreateBuynoteDto } from './dto/create-buynote.dto'
import { UpdateBuynoteDto } from './dto/update-buynote.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Buynote } from './entities/buynote.entity'
import { SystemExceptionFilter } from '../../common/filters/system-exception.filter'
import { ResponseCodes } from '../../config'

@Injectable()
export class BuynoteService {
  constructor(@InjectRepository(Buynote) private readonly repository: Repository<Buynote>) {}

  create(createBuynoteDto: CreateBuynoteDto) {
    let item = new Buynote()
    item = this.repository.merge(item, createBuynoteDto)
    return this.repository.save(item)
  }

  findAll() {
    return this.repository.createQueryBuilder().getMany()
  }

  async findOne(id: number) {
    const item = await this.repository.findOneBy({ id })
    if (!item) {
      throw new SystemExceptionFilter(ResponseCodes.RESOURCE_NOT_FOUND)
    }
    return item
  }

  // TODO 更新时是否需要先查询
  async update(id: number, updateBuynoteDto: UpdateBuynoteDto) {
    return await this.repository.update(id, updateBuynoteDto)
  }

  remove(id: number) {
    return this.repository.delete(id)
  }
}
