import { Injectable } from '@nestjs/common'
import { SkipHttpResponseFilter } from './common/filters/skip-http-response.filter'

@Injectable()
export class AppService {
  async getIndex() {
    return new SkipHttpResponseFilter(process.versions)
  }
}
