import { Test, TestingModule } from '@nestjs/testing'
import { UserLoginLogService } from '../user_login_log.service'

describe('UserLoginLogService', () => {
  let service: UserLoginLogService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserLoginLogService],
    }).compile()

    service = module.get<UserLoginLogService>(UserLoginLogService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
