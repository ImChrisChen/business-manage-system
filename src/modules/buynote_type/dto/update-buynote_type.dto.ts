import { PartialType } from '@nestjs/swagger'
import { CreateBuynoteTypeDto } from './create-buynote_type.dto'

export class UpdateBuynoteTypeDto extends PartialType(CreateBuynoteTypeDto) {}
