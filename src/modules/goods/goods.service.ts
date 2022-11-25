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
    private readonly goodsRepository: Repository<Goods>,
  ) {}
  create(createGoodDto: CreateGoodDto) {
    return 'This action adds a new good'
  }

  findAll() {
    return this.goodsRepository.find()
  }

  findOne(id: number) {
    return `This action returns a #${id} good`
  }

  update(id: number, updateGoodDto: UpdateGoodDto) {
    return `This action updates a #${id} good`
  }

  remove(id: number) {
    return `This action removes a #${id} good`
  }
}
