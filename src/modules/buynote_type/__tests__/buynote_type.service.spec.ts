import { Test, TestingModule } from '@nestjs/testing'
import { BuynoteTypeService } from '../buynote_type.service'

describe('BuynoteTypeService', () => {
  let service: BuynoteTypeService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BuynoteTypeService],
    }).compile()

    service = module.get<BuynoteTypeService>(BuynoteTypeService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
