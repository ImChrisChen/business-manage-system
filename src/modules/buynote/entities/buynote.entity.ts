import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { BuynoteType } from '../../buynote_type/entities/buynote_type.entity'

@Entity()
export class Buynote {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: false })
  amount: string

  @Column({ default: '' })
  comment: string

  // @Column()
  // type_id: number

  @ManyToOne((type) => BuynoteType, (buynote_type) => buynote_type.id)
  type: BuynoteType
}
