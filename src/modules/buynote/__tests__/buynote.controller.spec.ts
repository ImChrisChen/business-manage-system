import { Test, TestingModule } from '@nestjs/testing'
import { BuynoteController } from '../buynote.controller'
import { BuynoteService } from '../buynote.service'

describe('BuynoteController', () => {
  let controller: BuynoteController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BuynoteController],
      providers: [BuynoteService],
    }).compile()

    controller = module.get<BuynoteController>(BuynoteController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
