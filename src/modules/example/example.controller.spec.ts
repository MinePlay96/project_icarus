import { Test, TestingModule } from '@nestjs/testing';
import { CreateExampleDto } from './dto/create-example.dto';
import { ExampleController } from './example.controller';
import { ExampleService } from './example.service';

describe('ExampleController', () => {
  let controller: ExampleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExampleController],
      providers: [ExampleService],
    }).compile();

    controller = module.get<ExampleController>(ExampleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('can insert example in to the database', async () => {
      const exampleData = new CreateExampleDto();

      exampleData.title = 'Test Example';
      exampleData.description = 'this is the description of Test Example';

      expect(await controller.create(exampleData)).toContain(exampleData);
    });
  });
});
