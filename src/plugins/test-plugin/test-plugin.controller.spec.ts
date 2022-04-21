import { Test, TestingModule } from '@nestjs/testing';
import { TestPluginController } from './test-plugin.controller';
import { TestPluginService } from './test-plugin.service';

describe('TestPluginController', () => {
  let controller: TestPluginController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestPluginController],
      providers: [TestPluginService],
    }).compile();

    controller = module.get<TestPluginController>(TestPluginController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
