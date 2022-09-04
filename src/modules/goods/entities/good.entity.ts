import { Column, Entity, PrimaryColumn } from "typeorm";
@Entity()
export class Goods {
  @PrimaryColumn()
  id: number

  @Column()
  goods_name: string

  @Column()
  goods_category_id: number

  @Column()
  goods_price: number

  @Column()
  goods_desc: string

  @Column()
  goods_cover_url: string

  @Column()
  version: string
}
