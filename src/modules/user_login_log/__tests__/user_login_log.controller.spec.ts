import { Test, TestingModule } from '@nestjs/testing'
import { UserLoginLogController } from '../user_login_log.controller'

describe('UserLoginLogController', () => {
  let controller: UserLoginLogController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserLoginLogController],
    }).compile()

    controller = module.get<UserLoginLogController>(UserLoginLogController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
