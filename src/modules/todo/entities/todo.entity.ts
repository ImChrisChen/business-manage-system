import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { BaseColumnDto } from '../../../common/dto/index.dto'

@Entity()
export class Todo extends BaseColumnDto {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', default: '' })
  name: string

  @Column({ default: 0, type: 'int' })
  done: number

  @Column({ default: '', type: 'varchar' })
  comment: string
}
