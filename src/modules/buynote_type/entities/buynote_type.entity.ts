import { Buynote } from 'src/modules/buynote/entities/buynote.entity'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class BuynoteType {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  type_name: string

  @Column()
  pid: number

  @Column()
  path: string

  // 虚拟字段
  @OneToMany((type) => Buynote, (buynote) => buynote.type)
  buynotes: Array<Buynote>
}
