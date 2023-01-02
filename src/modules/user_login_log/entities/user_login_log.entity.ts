import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm'

export type LoginWay =
  | 'username_password'
  | 'email_password'
  | 'wechat_scancode'
  | 'google_oauth'
  | 'github_oauth'

@Entity()
export class UserLoginLog {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  login_way: LoginWay

  @Column()
  client_ip: string

  @CreateDateColumn({ nullable: true, type: 'timestamp' })
  login_time: string

  @Column({ type: 'timestamp' })
  logout_time: string

  @Column()
  user_agent: string

  @Column()
  device: string

  @Column()
  platform: string

  @Column()
  login_status: number

  @Column()
  user_id: number
}
