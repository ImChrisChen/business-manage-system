import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common'
import { GoodsService } from './goods.service'
import { CreateGoodsDto } from './dto/create-goods.dto'
import { UpdateGoodsDto } from './dto/update-goods.dto'
import { QueryGoodsDto } from './dto/query-goods.dto'
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard'
import { GetUser } from '../../common/decorators'

@UseGuards(JwtAuthGuard)
@Controller('goods')
export class GoodsController {
  constructor(private readonly goodsService: GoodsService) {}

  @Post()
  create(@Body() createGoodDto: CreateGoodsDto) {
    return this.goodsService.create(createGoodDto)
  }

  @Get()
  findAll(@Query() query?: QueryGoodsDto) {
    return this.goodsService.findAll(query)
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number, @GetUser() user) {
    return this.goodsService.findOne(id, user)
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateGoodDto: UpdateGoodsDto,
    @GetUser() user,
  ) {
    return this.goodsService.update(id, updateGoodDto, user)
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @GetUser() user) {
    return this.goodsService.remove(id, user)
  }
}
