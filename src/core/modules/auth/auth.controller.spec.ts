import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        // {
        //   provide: AuthService,
        //   useValue: {
        //     create: jest
        //       .fn()
        //       .mockImplementation(async (example: CreateExampleDto) => {
        //         const data = { id: randomUUID(), ...example };
        //         mockStore.push(data);
        //         return data;
        //       }),
        //     findAll: jest.fn().mockResolvedValue(mockStore),
        //     findOne: jest.fn().mockImplementation(
        //       (id: string) =>
        //         new Promise((resolve, reject) => {
        //           const example = mockStore.find(
        //             (example) => example.id === id,
        //           );
        //           if (example) {
        //             resolve(example);
        //             return;
        //           }

        //           reject();
        //         }),
        //     ),
        //     remove: jest.fn().mockImplementation((id: string) => {
        //       const index = mockStore.findIndex((example) => example.id === id);

        //       if (!index) {
        //         return;
        //       }

        //       mockStore.splice(index, 1);
        //     }),
        //   },
        // },
      ],
    }).compile();

    controller = module.get(AuthController);
    service = module.get(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login()', () => {
    it('should return a access_token', async () => {
      const result = Promise.resolve({ access_token: 'access_token_test' });

      jest.spyOn(service, 'login').mockImplementation(() => result);

      expect(await controller.login({})).toMatchObject(await result);
    });
  });
});
