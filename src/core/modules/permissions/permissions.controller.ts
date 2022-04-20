import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Permission } from './permission.decorator';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Post()
  create(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionsService.create(createPermissionDto);
  }

  @Get()
  @Permission('permissions.findAll')
  findAll() {
    return this.permissionsService.findAll();
  }

  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.permissionsService.findOne(name);
  }

  @Patch(':name')
  update(
    @Param('name') name: string,
    @Body() updatePermissionDto: UpdatePermissionDto,
  ) {
    return this.permissionsService.update(name, updatePermissionDto);
  }

  @Delete(':name')
  remove(@Param('name') name: string) {
    return this.permissionsService.remove(name);
  }
}
