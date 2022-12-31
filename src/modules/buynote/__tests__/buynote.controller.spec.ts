import { Test, TestingModule } from '@nestjs/testing'
import { BuynoteController } from '../buynote.controller'
import { BuynoteService } from '../buynote.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Buynote } from '../entities/buynote.entity'

describe('BuynoteController', () => {
  let controller: BuynoteController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([Buynote])],
      controllers: [BuynoteController],
      providers: [BuynoteService],
    }).compile()

    controller = module.get<BuynoteController>(BuynoteController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
