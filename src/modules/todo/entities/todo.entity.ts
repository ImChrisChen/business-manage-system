import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { BasicFieldEntity } from '../../../common/entities'

@Entity()
export class Todo extends BasicFieldEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', default: '' })
  name: string

  @Column({ default: 0, type: 'int' })
  done: number

  @Column({ default: '', type: 'varchar' })
  comment: string
}
