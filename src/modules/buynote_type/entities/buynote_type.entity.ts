import { Buynote } from 'src/modules/buynote/entities/buynote.entity'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { BasicFieldEntity } from '../../../common/entities'

@Entity()
export class BuynoteType extends BasicFieldEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: false })
  type_name: string

  @Column({ nullable: false, default: 0 })
  pid: number

  // @Column({
  //   comment:
  //     '父级ID的路径, .分割, 例如：0.0.2, 代表上级的ID id:1 => id: 10 => id:13',
  //   default: '',
  //   nullable: true,
  // })
  // path: string

  @OneToMany((type) => Buynote, (buynote) => buynote.type)
  buynotes: Array<Buynote>
}
