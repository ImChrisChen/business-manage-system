import { CreateDateColumn, UpdateDateColumn } from 'typeorm'

export class BasicFieldEntity {
  @UpdateDateColumn({ nullable: true })
  updated_at: Date

  @CreateDateColumn({ nullable: true })
  created_at: Date
}
