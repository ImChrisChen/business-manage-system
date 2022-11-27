import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { BuynoteTypeService } from './buynote_type.service'
import { CreateBuynoteTypeDto } from './dto/create-buynote_type.dto'
import { UpdateBuynoteTypeDto } from './dto/update-buynote_type.dto'

@Controller('buynote_type')
export class BuynoteTypeController {
  constructor(private readonly buynoteTypeService: BuynoteTypeService) {}

  @Post()
  create(@Body() createBuynoteTypeDto: CreateBuynoteTypeDto) {
    return this.buynoteTypeService.create(createBuynoteTypeDto)
  }

  @Get()
  findAll() {
    return this.buynoteTypeService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.buynoteTypeService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBuynoteTypeDto: UpdateBuynoteTypeDto) {
    return this.buynoteTypeService.update(+id, updateBuynoteTypeDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.buynoteTypeService.remove(+id)
  }
}
