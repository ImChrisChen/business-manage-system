import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { BuynoteService } from './buynote.service'
import { CreateBuynoteDto } from './dto/create-buynote.dto'
import { UpdateBuynoteDto } from './dto/update-buynote.dto'

@Controller('buynote')
export class BuynoteController {
  constructor(private readonly buynoteService: BuynoteService) {}

  @Post()
  create(@Body() createBuynoteDto: CreateBuynoteDto) {
    return this.buynoteService.create(createBuynoteDto)
  }

  @Get()
  findAll() {
    return this.buynoteService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.buynoteService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBuynoteDto: UpdateBuynoteDto) {
    return this.buynoteService.update(+id, updateBuynoteDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.buynoteService.remove(+id)
  }
}
