import { Injectable } from '@nestjs/common'
import { CreateGoodsCategoryDto } from './dto/create-goods_category.dto'
import { UpdateGoodsCategoryDto } from './dto/update-goods_category.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { GoodsCategory } from './entities/goods_category.entity'
import { Repository } from 'typeorm'

@Injectable()
export class GoodsCategoryService {
  constructor(@InjectRepository(GoodsCategory) private readonly repository: Repository<GoodsCategory>) {}
  create(createGoodsCategoryDto: CreateGoodsCategoryDto) {
    return this.repository.insert(createGoodsCategoryDto)
  }

  findAll() {
    return this.repository.createQueryBuilder().getMany()
  }

  findOne(id: number) {
    return this.repository.findOne({
      where: { id },
      // relations: ['goods_list'],
    })
  }

  update(id: number, updateGoodsCategoryDto: UpdateGoodsCategoryDto) {
    return this.repository.update(id, updateGoodsCategoryDto)
  }

  remove(id: number) {
    return this.repository.delete(id)
  }
}
