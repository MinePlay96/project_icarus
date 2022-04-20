import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Example } from './entities/Example.entity';
import { ExampleService } from './example.service';

const exampleArray = [
  {
    title: 'title #1',
    description: 'description #1',
  },
  {
    title: 'title #2',
    description: 'description #2',
  },
];

const oneExample = {
  title: 'title #1',
  description: 'description #1',
};

describe('ExampleService', () => {
  let service: ExampleService;
  let repository: Repository<Example>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExampleService,
        {
          provide: getRepositoryToken(Example),
          useValue: {
            find: jest.fn().mockResolvedValue(exampleArray),
            findOne: jest.fn().mockResolvedValue(oneExample),
            findOneOrFail: jest.fn().mockResolvedValue(oneExample),
            save: jest.fn().mockResolvedValue(oneExample),
            create: jest.fn().mockResolvedValue(oneExample),
            remove: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ExampleService>(ExampleService);
    repository = module.get<Repository<Example>>(getRepositoryToken(Example));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create()', () => {
    it('should successfully insert a example', () => {
      expect(service.create(oneExample)).resolves.toEqual(oneExample);
    });
  });

  describe('findAll()', () => {
    it('should return an array of example', async () => {
      const users = await service.findAll();
      expect(users).toEqual(exampleArray);
    });
  });

  describe('findOne()', () => {
    it('should get a single example', () => {
      const repoSpy = jest.spyOn(repository, 'findOneOrFail');
      expect(service.findOne('1')).resolves.toEqual(oneExample);
      expect(repoSpy).toBeCalledWith('1');
    });
  });

  describe('remove()', () => {
    it('should call remove with the passed value', async () => {
      const removeSpy = jest.spyOn(repository, 'delete');
      const retVal = await service.remove('2');
      expect(removeSpy).toBeCalledWith('2');
      expect(retVal).toBeUndefined();
    });
  });
});
