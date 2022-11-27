import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { BaseColumnDto } from '../../../common/dto/index.dto'
import { Goods } from '../../goods/entities/good.entity'

@Entity()
export class GoodsCategory extends BaseColumnDto {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  category_name: string

  @Column()
  pid: number

  @Column()
  path: string

  @OneToMany(() => Goods, (goods) => goods.goods_category_id)
  goods_list: Array<Goods>
}
