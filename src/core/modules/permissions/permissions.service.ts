import { Injectable, NotImplementedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Permission } from './entities/permission.entity';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  public create(createPermissionDto: CreatePermissionDto) {
    throw new NotImplementedException();
  }

  public findAll() {
    return this.permissionRepository.find();
  }

  public findOne(name: string) {
    return this.permissionRepository.findOne();
  }

  public update(name: string, updatePermissionDto: UpdatePermissionDto) {
    throw new NotImplementedException();
  }

  public remove(name: string) {
    throw new NotImplementedException();
  }
}
