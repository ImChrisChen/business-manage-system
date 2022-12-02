import { Injectable } from '@nestjs/common'
import { CreateGoodsDto } from './dto/create-goods.dto'
import { UpdateGoodsDto } from './dto/update-goods.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Goods } from './entities/good.entity'
import { Like, Repository } from 'typeorm'
import { QueryGoodsDto } from './dto/query-goods.dto'

@Injectable()
export class GoodsService {
  constructor(
    @InjectRepository(Goods)
    private readonly repository: Repository<Goods>,
  ) {}
  create(createGoodDto: CreateGoodsDto) {
    return this.repository.insert(createGoodDto)
  }

  findAll(query: QueryGoodsDto) {
    return this.repository
      .createQueryBuilder()
      .setFindOptions({
        relations: ['goods_category'],
        where: {
          goods_name: query.goods_name ? Like(`%${query.goods_name}%`) : null,
          goods_desc: query.goods_desc ? Like(`%${query.goods_desc}%`) : null,
        },
      })
      .getMany()
  }

  findOne(id: number) {
    return this.repository.find({
      where: { id },
      relations: ['goods_category'],
    })
  }

  update(id: number, updateGoodDto: UpdateGoodsDto) {
    return this.repository.update(id, updateGoodDto)
  }

  remove(id: number) {
    return this.repository.delete(id)
  }
}
