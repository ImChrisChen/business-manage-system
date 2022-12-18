import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  CacheInterceptor,
} from '@nestjs/common'
import { GoodsService } from './goods.service'
import { CreateGoodsDto } from './dto/create-goods.dto'
import { UpdateGoodsDto } from './dto/update-goods.dto'
import { QueryGoodsDto } from './dto/query-goods.dto'

@UseInterceptors(CacheInterceptor)
@Controller('goods')
export class GoodsController {
  constructor(private readonly goodsService: GoodsService) {}

  @Post()
  create(@Body() createGoodDto: CreateGoodsDto) {
    return this.goodsService.create(createGoodDto)
  }

  @Get()
  findAll(@Query() query: QueryGoodsDto) {
    return this.goodsService.findAll(query)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.goodsService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGoodDto: UpdateGoodsDto) {
    return this.goodsService.update(+id, updateGoodDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.goodsService.remove(+id)
  }
}
