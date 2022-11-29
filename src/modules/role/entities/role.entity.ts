import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { BasicFieldEntity } from '../../../common/entities'

@Entity()
export class Role extends BasicFieldEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  role: string

  @Column()
  role_name: string

  @Column({ default: 0 })
  role_parent_id: number
}
