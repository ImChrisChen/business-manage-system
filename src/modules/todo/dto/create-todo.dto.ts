import { Column, PrimaryGeneratedColumn } from 'typeorm'
import { BaseColumnDto } from '../../../common/dto/index.dto'

export class CreateTodoDto extends BaseColumnDto {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', default: '' })
  name: string

  @Column({ default: 0, type: 'int' })
  done: number

  @Column({ default: '', type: 'varchar' })
  comment: string
}
