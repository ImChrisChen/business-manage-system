import { Injectable } from '@nestjs/common';
import { CreatePermissionDto } from "./dto/create-permission.dto";
import { UpdatePermissionDto } from "./dto/update-permission.dto";
@Injectable()
export class PermissionService {
  create(createAuthDto: CreatePermissionDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdatePermissionDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
