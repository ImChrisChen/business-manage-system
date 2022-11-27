import { Injectable } from '@nestjs/common'
import { CreateGoodDto } from './dto/create-good.dto'
import { UpdateGoodDto } from './dto/update-good.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Goods } from './entities/good.entity'
import { Repository } from 'typeorm'

@Injectable()
export class GoodsService {
  constructor(
    @InjectRepository(Goods)
    private readonly repository: Repository<Goods>,
  ) {}
  create(createGoodDto: CreateGoodDto) {
    return this.repository.insert(createGoodDto)
  }

  findAll() {
    return this.repository.createQueryBuilder().getMany()
  }

  findOne(id: number) {
    return this.repository.findOneBy({ id })
  }

  update(id: number, updateGoodDto: UpdateGoodDto) {
    return this.repository.update(id, updateGoodDto)
  }

  remove(id: number) {
    return this.repository.delete(id)
  }
}
