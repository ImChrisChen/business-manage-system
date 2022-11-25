/**
 * Created by WebStorm.
 * User: chrischen
 * Date: 2022/9/4
 * Time: 20:35
 */
import { User } from '../entities/user.entity'

export type FindOneUserOptions = Partial<Pick<User, 'id' | 'username' | 'phone' | 'email' | 'password'>>
