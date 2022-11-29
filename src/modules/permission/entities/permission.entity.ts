import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { BasicFieldEntity } from '../../../common/entities'

@Entity()
export class Permission extends BasicFieldEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  permission: string

  @Column({ comment: '权限描述', default: '' })
  permission_desc: string

  @Column({ comment: '权限父ID', default: 0 })
  pid: number
}
