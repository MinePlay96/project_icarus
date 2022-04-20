import { Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';

@Injectable()
export class PermissionsService {
  create(createPermissionDto: CreatePermissionDto) {
    return 'This action adds a new permission';
  }

  findAll() {
    return `This action returns all permissions`;
  }

  findOne(uuid: string) {
    return `This action returns a #${uuid} permission`;
  }

  update(uuid: string, updatePermissionDto: UpdatePermissionDto) {
    return `This action updates a #${uuid} permission`;
  }

  remove(uuid: string) {
    return `This action removes a #${uuid} permission`;
  }
}
