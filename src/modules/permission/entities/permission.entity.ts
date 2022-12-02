import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'
import { BasicFieldEntity } from '../../../common/entities'
import { Role } from '../../role/entities/role.entity'

@Entity()
export class Permission extends BasicFieldEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  permission: string

  @Column({ comment: '权限描述', default: '' })
  permission_desc: string

  @Column({ comment: '权限类型' })
  permission_type: string | 'create' | 'update' | 'read' | 'delete'

  @Column({ comment: '权限父ID', default: 0 })
  pid: number

  @ManyToMany(() => Role, (role) => role.permissions)
  roles: Array<Role>
}
