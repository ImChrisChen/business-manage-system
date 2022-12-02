import { PartialType } from '@nestjs/mapped-types'
import { CreateGoodsDto } from './create-goods.dto'

export class UpdateGoodsDto extends PartialType(CreateGoodsDto) {}
