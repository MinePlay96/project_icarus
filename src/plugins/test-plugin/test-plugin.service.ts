import { Injectable } from '@nestjs/common';
import { CreateTestPluginDto } from './dto/create-test-plugin.dto';
import { UpdateTestPluginDto } from './dto/update-test-plugin.dto';

@Injectable()
export class TestPluginService {
  create(createTestPluginDto: CreateTestPluginDto) {
    return 'This action adds a new testPlugin';
  }

  findAll() {
    return `This action returns all testPlugin`;
  }

  findOne(id: number) {
    return `This action returns a #${id} testPlugin`;
  }

  update(id: number, updateTestPluginDto: UpdateTestPluginDto) {
    return `This action updates a #${id} testPlugin`;
  }

  remove(id: number) {
    return `This action removes a #${id} testPlugin`;
  }
}
