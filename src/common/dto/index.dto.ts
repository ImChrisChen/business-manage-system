import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm'

/**
 * Column 公共属性
 */
export class BaseColumnDto {
  // 更新时间
  // @UpdateDateColumn({
  //   type: 'timestamp',
  //   onUpdate: 'CURRENT_TIMESTAMP',
  // })
  // updated_at: string
  //
  // // 创建时间
  // @CreateDateColumn({
  //   type: 'timestamp',
  //   default: () => 'CURRENT_TIMESTAMP',
  // })
  // created_at: string
  // 删除时间，软删除
  // @DeleteDateColumn({
  //   type: 'timestamp',
  //   default: () => 'CURRENT_TIMESTAMP',
  // })
  // deleted_at: string
}
