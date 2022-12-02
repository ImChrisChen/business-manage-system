import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Goods } from '../../goods/entities/good.entity'
import { BasicFieldEntity } from '../../../common/entities'

@Entity()
export class GoodsCategory extends BasicFieldEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  category_name: string

  @Column()
  pid: number

  @Column()
  path: string

  @OneToMany(() => Goods, (goods) => goods.goods_category)
  goods_list: Array<Goods>
}
