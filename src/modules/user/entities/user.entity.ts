import { Column, Entity, ManyToMany, OneToMany, PrimaryColumn } from 'typeorm'
import { Role } from '../../role/entities/role.entity'

@Entity()
export class User {
  @PrimaryColumn()
  id: number

  @Column({ type: 'varchar' })
  username: string

  @Column({ type: 'enum', enum: [0, 1, -1], default: -1 })
  sex: 0 | 1 | -1

  @Column({ type: 'varchar' })
  email: string

  @Column({ type: 'varchar' })
  phone: string

  @Column({ type: 'varchar' })
  avatar: string

  @Column({ type: 'int' })
  age: number

  @Column({ type: 'varchar' })
  password: string

  // @OneToMany(() => Role, (role: Role) => role.id)
  // role: Role

  @Column({ type: 'int' })
  role_id: number

  // 是否删除(软删除)
  @Column({ type: 'int' })
  is_del: number

  // 一个用户可以拥有多个角色，一个角色也可以分配给不同用户
  @ManyToMany(() => Role, (role) => role.users)
  roles: Array<Role>
}
