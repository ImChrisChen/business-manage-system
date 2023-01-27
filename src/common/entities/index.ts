import { CreateDateColumn, UpdateDateColumn } from 'typeorm'

export class BasicFieldEntity {
  @UpdateDateColumn({ nullable: true, type: 'timestamp' })
  updated_at: Date

  @CreateDateColumn({ nullable: true, type: 'timestamp' })
  created_at: Date
}
