import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { BuynoteType } from '../../buynote_type/entities/buynote_type.entity'
import { BasicFieldEntity } from '../../../common/entities'

@Entity()
export class Buynote extends BasicFieldEntity {
  @PrimaryGeneratedColumn({
    comment: '选择buynote_type时，只能选择最后一级的type',
  })
  id: number

  @Column({ nullable: false })
  amount: string

  @Column({ default: '' })
  comment: string

  @UpdateDateColumn({
    nullable: true,
    comment: '账单消费时间',
    type: 'timestamp',
  })
  cost_datetime: Date

  // @Column()
  // type_id: number
  @ManyToOne((type) => BuynoteType, (buynote_type) => buynote_type.buynotes)
  @JoinColumn({
    referencedColumnName: 'id',
    name: 'type_id',
    foreignKeyConstraintName: 'fk_type_id',
  })
  type: BuynoteType
}
