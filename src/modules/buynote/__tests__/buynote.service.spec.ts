import { Test, TestingModule } from '@nestjs/testing'
import { BuynoteService } from '../buynote.service'
import { BuynoteController } from '../buynote.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Buynote } from '../entities/buynote.entity'

describe('BuynoteService', () => {
  let service: BuynoteService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([Buynote])],
      controllers: [BuynoteController],
      providers: [BuynoteService],
    }).compile()

    service = module.get<BuynoteService>(BuynoteService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
