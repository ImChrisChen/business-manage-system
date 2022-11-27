import { Test, TestingModule } from '@nestjs/testing'
import { GoodsCategoryService } from '../goods_category.service'

describe('GoodsCategoryService', () => {
  let service: GoodsCategoryService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GoodsCategoryService],
    }).compile()

    service = module.get<GoodsCategoryService>(GoodsCategoryService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
