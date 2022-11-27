import { Test, TestingModule } from '@nestjs/testing'
import { GoodsCategoryController } from '../goods_category.controller'
import { GoodsCategoryService } from '../goods_category.service'

describe('GoodsCategoryController', () => {
  let controller: GoodsCategoryController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GoodsCategoryController],
      providers: [GoodsCategoryService],
    }).compile()

    controller = module.get<GoodsCategoryController>(GoodsCategoryController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
