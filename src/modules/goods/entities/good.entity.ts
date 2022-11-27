import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm'
import { BaseColumnDto } from '../../../common/dto/index.dto'
import { GoodsCategory } from '../../goods_category/entities/goods_category.entity'
@Entity()
export class Goods extends BaseColumnDto {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  goods_name: string

  @Column()
  goods_price: number

  @Column()
  goods_desc: string

  @Column()
  goods_cover_url: string

  @Column()
  version: string

  @Column()
  goods_category_id: number

  @ManyToOne(() => GoodsCategory, (goods_category) => goods_category.goods_list)
  goods_list: Array<Goods>
}
