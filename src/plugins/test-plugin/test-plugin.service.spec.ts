import { Test, TestingModule } from '@nestjs/testing';
import { TestPluginService } from './test-plugin.service';

describe('TestPluginService', () => {
  let service: TestPluginService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestPluginService],
    }).compile();

    service = module.get<TestPluginService>(TestPluginService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
