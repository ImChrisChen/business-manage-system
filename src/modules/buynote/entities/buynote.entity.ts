import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { BuynoteType } from '../../buynote_type/entities/buynote_type.entity'
import { BasicFieldEntity } from '../../../common/entities'

@Entity()
export class Buynote extends BasicFieldEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: false })
  amount: string

  @Column({ default: '' })
  comment: string

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
