import { Injectable } from '@nestjs/common'
import { CreateBuynoteDto } from './dto/create-buynote.dto'
import { UpdateBuynoteDto } from './dto/update-buynote.dto'

@Injectable()
export class BuynoteService {
  create(createBuynoteDto: CreateBuynoteDto) {
    return 'This action adds a new buynote'
  }

  findAll() {
    return `This action returns all buynote`
  }

  findOne(id: number) {
    return `This action returns a #${id} buynote`
  }

  update(id: number, updateBuynoteDto: UpdateBuynoteDto) {
    return `This action updates a #${id} buynote`
  }

  remove(id: number) {
    return `This action removes a #${id} buynote`
  }
}
