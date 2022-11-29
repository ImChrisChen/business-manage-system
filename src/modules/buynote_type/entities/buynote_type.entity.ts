import { Buynote } from 'src/modules/buynote/entities/buynote.entity'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { BasicFieldEntity } from '../../../common/entities'

@Entity()
export class BuynoteType extends BasicFieldEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  type_name: string

  @Column()
  pid: number

  @Column()
  path: string

  @OneToMany((type) => Buynote, (buynote) => buynote.type)
  buynotes: Array<Buynote>
}
