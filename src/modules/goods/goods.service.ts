import { Injectable } from '@nestjs/common'
import { CreateGoodsDto } from './dto/create-goods.dto'
import { UpdateGoodsDto } from './dto/update-goods.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Goods } from './entities/good.entity'
import { Like, Repository } from 'typeorm'
import { QueryGoodsDto } from './dto/query-goods.dto'
import { CacheService } from '../cache/cache.service'

@Injectable()
export class GoodsService {
  constructor(
    @InjectRepository(Goods) private readonly repository: Repository<Goods>,
    private readonly cacheService: CacheService,
  ) {}

  create(createGoodDto: CreateGoodsDto) {
    return this.repository.insert(createGoodDto)
  }

  findAll(query?: QueryGoodsDto) {
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

  async findOne(id: number, user) {
    const key = this.cacheService.genKey('goods', id, user.userId)
    const cache = await this.cacheService.get(key)
    if (cache) {
      return cache
    }
    const item = await this.repository.findOne({
      where: { id },
      relations: ['goods_category'],
    })
    item && (await this.cacheService.set(key, item))
    return item
  }

  async update(id: number, updateGoodDto: UpdateGoodsDto, user) {
    const key = this.cacheService.genKey('goods', id, user.userId)
    await this.cacheService.del(key)
    return this.repository.update(id, updateGoodDto)
  }

  async remove(id: number, user) {
    const key = this.cacheService.genKey('goods', id, user.userId)
    await this.cacheService.del(key)
    return this.repository.delete(id)
  }
}
