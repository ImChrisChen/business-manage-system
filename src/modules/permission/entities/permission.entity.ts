import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { BaseColumnDto } from '../../../common/dto/index.dto'

@Entity()
export class Permission extends BaseColumnDto {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  permission: string

  @Column()
  permission_desc: string
}
