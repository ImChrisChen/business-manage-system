import { Injectable } from '@nestjs/common'
import { SkipHttpResponseFilter } from './common/filters/skip-http-response.filter'

@Injectable()
export class AppService {
  getIndex() {
    return new SkipHttpResponseFilter(process.versions)
  }
}
