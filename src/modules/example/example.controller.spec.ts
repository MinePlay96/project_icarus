import { Test, TestingModule } from '@nestjs/testing';
import { randomUUID } from 'crypto';
import { CreateExampleDto } from './dto/create-example.dto';
import { ExampleController } from './example.controller';
import { ExampleService } from './example.service';

const createExampleDto: CreateExampleDto = {
  title: 'title',
  description: 'description',
};

const exampleToRemove = {
  id: randomUUID(),
  title: 'to be removed',
  description: 'this will be removed',
};

const mockStore = [exampleToRemove];

describe('ExampleController', () => {
  let controller: ExampleController;
  let service: ExampleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExampleController],
      providers: [
        ExampleService,
        {
          provide: ExampleService,
          useValue: {
            create: jest
              .fn()
              .mockImplementation(async (example: CreateExampleDto) => {
                const data = { id: randomUUID(), ...example };
                mockStore.push(data);
                return data;
              }),
            findAll: jest.fn().mockResolvedValue(mockStore),
            findOne: jest.fn().mockImplementation(
              (id: string) =>
                new Promise((resolve, reject) => {
                  const example = mockStore.find(
                    (example) => example.id === id,
                  );
                  if (example) {
                    resolve(example);
                    return;
                  }

                  reject();
                }),
            ),
            remove: jest.fn().mockImplementation((id: string) => {
              const index = mockStore.findIndex((example) => example.id === id);

              if (!index) {
                return;
              }

              mockStore.splice(index, 1);
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<ExampleController>(ExampleController);
    service = module.get<ExampleService>(ExampleService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create()', () => {
    it('should create a exampl', async () => {
      const createResponse = controller.create(createExampleDto);

      expect(createResponse).resolves.toMatchObject(createExampleDto);
      expect(createResponse).resolves.toHaveProperty('id');

      expect(service.create).toHaveBeenCalledWith(createExampleDto);
    });
  });

  describe('findAll()', () => {
    it('should find all examples ', () => {
      controller.findAll();
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne()', () => {
    it('should find a exampl', () => {
      expect(controller.findOne(exampleToRemove.id)).resolves.toEqual(
        exampleToRemove,
      );
      expect(service.findOne).toHaveBeenCalled();
    });
  });

  describe('remove()', () => {
    it('should remove the example', () => {
      controller.remove(exampleToRemove.id);
      expect(service.remove).toHaveBeenCalled();
    });

    it('should not find the removed example', () => {
      expect(controller.findAll()).not.toContain(exampleToRemove);
    });
  });
});
