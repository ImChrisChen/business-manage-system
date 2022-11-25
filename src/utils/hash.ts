/**
 * Created by WebStorm.
 * User: chrischen
 * Date: 2022/9/2
 * Time: 23:31
 */
import { createHash } from 'crypto'

export function sha256(v: string) {
  const hash = createHash('sha256')
  return hash.update(v).digest('hex')
}
