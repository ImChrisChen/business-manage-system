/**
 * Created by WebStorm.
 * User: chrischen
 * Date: 2022/9/2
 * Time: 23:31
 */

export function isError(v) {
  return v.constructor === Error || v instanceof Error
}
