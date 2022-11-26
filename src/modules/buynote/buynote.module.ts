import { Module } from '@nestjs/common'
import { BuynoteService } from './buynote.service'
import { BuynoteController } from './buynote.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Buynote } from './entities/buynote.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Buynote])],
  controllers: [BuynoteController],
  providers: [BuynoteService],
})
export class BuynoteModule {}
