import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm'
import { GoodsCategory } from '../../goods_category/entities/goods_category.entity'
import { BasicFieldEntity } from '../../../common/entities'

@Entity()
export class Goods extends BasicFieldEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  goods_name: string

  @Column()
  goods_price: number

  @Column({ default: null })
  goods_desc: string

  @Column({ default: null })
  goods_cover_url: string

  @Column({ default: '1' })
  version: string

  // @Column()
  // goods_category_id: number

  /**
   * ALTER TABLE `goods`
   * ADD CONSTRAINT `fk_goods_category_id`    # foreignKeyConstraintName
   * FOREIGN KEY (`goods_category_id`)        # name
   * REFERENCES `goods_category`(`id`)        # referencedColumnName
   * ON DELETE NO ACTION ON UPDATE NO ACTION
   */
  @ManyToOne(
    (type) => GoodsCategory,
    (goods_category) => goods_category.goods_list,
  )
  @JoinColumn({
    name: 'goods_category_id', // 指定自定义连接列名称 (生成goods_category_id)
    referencedColumnName: 'id', // 引用 goods_category表的id字段
    foreignKeyConstraintName: 'fk_goods_category_id',
  }) // 自定义外键
  goods_category: GoodsCategory
}
