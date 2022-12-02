import { BaseColumnDto } from '../../../common/dto/index.dto'

export class CreateRoleDto extends BaseColumnDto {
  id: number
  role_id: number
  role_name: string
  role_parent_id: number
}
