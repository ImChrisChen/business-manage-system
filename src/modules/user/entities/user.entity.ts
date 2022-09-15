import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryColumn()
  id: number;

  @Column({ type: "varchar" })
  username: string;

  @Column({ type: "enum", enum: [0, 1, -1], default: -1})
  sex: 0 | 1 | -1

  @Column({type: "varchar"})
  email: string

  @Column({type: "varchar"})
  phone: string

  @Column({type:"varchar"})
  avatar: string

  @Column({ type: "int"})
  age: number

  @Column({type: "varchar"})
  password: string

  // @OneToMany(() => Role, (role: Role) => role.id)
  // role: Role

  @Column({type: "int"})
  role_id: number

  // 是否删除(软删除)
  @Column({type: "int"})
  is_del: number
}
