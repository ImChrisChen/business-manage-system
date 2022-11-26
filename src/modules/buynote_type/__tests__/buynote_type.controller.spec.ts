import { Test, TestingModule } from '@nestjs/testing'
import { BuynoteTypeController } from '../buynote_type.controller'
import { BuynoteTypeService } from '../buynote_type.service'

describe('BuynoteTypeController', () => {
  let controller: BuynoteTypeController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BuynoteTypeController],
      providers: [BuynoteTypeService],
    }).compile()

    controller = module.get<BuynoteTypeController>(BuynoteTypeController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
