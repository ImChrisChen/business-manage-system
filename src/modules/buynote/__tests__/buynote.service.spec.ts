import { Test, TestingModule } from '@nestjs/testing'
import { BuynoteService } from '../buynote.service'

describe('BuynoteService', () => {
  let service: BuynoteService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BuynoteService],
    }).compile()

    service = module.get<BuynoteService>(BuynoteService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
