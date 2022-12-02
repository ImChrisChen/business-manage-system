import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  JoinTable,
} from 'typeorm'
import { BasicFieldEntity } from '../../../common/entities'
import { Permission } from '../../permission/entities/permission.entity'
import { User } from '../../user/entities/user.entity'

@Entity()
export class Role extends BasicFieldEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  role: string

  @Column()
  role_name: string

  @Column({ default: 0 })
  pid: number

  @ManyToMany(() => Permission, (permission) => permission.roles)
  @JoinTable({
    name: 'role_to_permission',
    joinColumn: {
      name: 'role_id',
      referencedColumnName: 'id', // 连接目标表的字段名称 role.id
    },
    inverseJoinColumn: {
      name: 'permission_id',
      referencedColumnName: 'id', // 连接目标表的字段名称 permission.id
    },
  })
  permissions: Array<Permission>

  @ManyToMany(() => User, (user) => user.roles)
  @JoinTable({
    name: 'role_to_user',
    joinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
  })
  users: Array<User>
}
