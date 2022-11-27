import { Module } from '@nestjs/common'
import { GoodsCategoryService } from './goods_category.service'
import { GoodsCategoryController } from './goods_category.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GoodsCategory } from './entities/goods_category.entity'

@Module({
  imports: [TypeOrmModule.forFeature([GoodsCategory])],
  controllers: [GoodsCategoryController],
  providers: [GoodsCategoryService],
})
export class GoodsCategoryModule {}
