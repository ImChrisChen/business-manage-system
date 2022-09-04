import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Role {
  @PrimaryColumn()
  id: number

  @Column()
  role: string

  @Column()
  role_name: string

  @Column()
  created_at: number

  @Column()
  updated_at: number

}
