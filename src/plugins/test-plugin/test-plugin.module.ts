import { Module } from '@nestjs/common';
import { TestPluginService } from './test-plugin.service';
import { TestPluginController } from './test-plugin.controller';

@Module({
  controllers: [TestPluginController],
  providers: [TestPluginService]
})
export class TestPluginModule {}
