import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common'
import { Cache } from 'cache-manager'

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManage: Cache) {}

  /**
   * 生成key
   * @param entityName 实体名称
   * @param itemId 列id
   */
  genKey(entityName: string, itemId?: number | string): string {
    const projectName = 'BusinessManageSystem'
    return `${projectName}_${entityName}${itemId ? '_' + itemId : ''}`
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
