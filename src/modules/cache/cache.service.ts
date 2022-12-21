import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common'
import { Cache } from 'cache-manager'
import { genCacheKey } from '../../utils'

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManage: Cache) {}

  /**
   * 生成key
   * @param entityName 实体名称
   * @param itemId 列id
   * @param uid 用户ID,有则代表私有缓存
   */
  genKey(
    entityName: string,
    itemId?: number | string,
    uid?: string | number,
  ): string {
    return genCacheKey(entityName, itemId, uid)
  }

  async get(key: string) {
    return this.cacheManage.get(key)
  }

  async set(key: string, value) {
    return this.cacheManage.set(key, value)
  }

  async del(key) {
    return this.cacheManage.del(key)
  }
}
