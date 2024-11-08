import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TestPluginService } from './test-plugin.service';
import { CreateTestPluginDto } from './dto/create-test-plugin.dto';
import { UpdateTestPluginDto } from './dto/update-test-plugin.dto';

@Controller('test-plugin')
export class TestPluginController {
  constructor(private readonly testPluginService: TestPluginService) {}

  @Post()
  create(@Body() createTestPluginDto: CreateTestPluginDto) {
    return this.testPluginService.create(createTestPluginDto);
  }

  @Get()
  findAll() {
    return this.testPluginService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testPluginService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTestPluginDto: UpdateTestPluginDto,
  ) {
    return this.testPluginService.update(+id, updateTestPluginDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testPluginService.remove(+id);
  }
}
