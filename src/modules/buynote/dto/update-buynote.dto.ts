import { PartialType } from '@nestjs/swagger'
import { CreateBuynoteDto } from './create-buynote.dto'

export class UpdateBuynoteDto extends PartialType(CreateBuynoteDto) {}
