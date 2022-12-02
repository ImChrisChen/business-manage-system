import { Module } from '@nestjs/common'
import { BuynoteTypeService } from './buynote_type.service'
import { BuynoteTypeController } from './buynote_type.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BuynoteType } from './entities/buynote_type.entity'

@Module({
  imports: [TypeOrmModule.forFeature([BuynoteType])],
  controllers: [BuynoteTypeController],
  providers: [BuynoteTypeService],
})
export class BuynoteTypeModule {}
