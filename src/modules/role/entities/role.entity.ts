import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { BaseColumnDto } from '../../../common/dto/index.dto'

@Entity()
export class Role extends BaseColumnDto {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  role: string

  @Column()
  role_name: string

  @Column({ default: 0 })
  role_parent_id: number
}
