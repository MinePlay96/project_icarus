import { ConfigModule, getConfigToken } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import userConfig from './user.config';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  const newUser = {
    email: '' + Math.random() + '@test.com',
    password: 'test',
    firstName: 'Test',
    lastName: 'Test',
  };

  const oneUser = {
    uuid: 'uuid',
    email: 'email',
    password: 'password',
    firstName: 'firstName',
    lastName: 'lastName',
  };

  const userArray = [
    oneUser,
    {
      uuid: 'uuid2',
      email: 'email2',
      password: 'password2',
      firstName: 'firstName2',
      lastName: 'lastName2',
    },
  ];

  const oneUserPasswordHash =
    '$2b$10$nSnMYRIiwVWzt.CXYSEbIu/WxT1Eo9wb4PZsdlc39MCyGodwpOjUm';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forFeature(userConfig)],
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            create: jest.fn().mockResolvedValue(oneUser),
            find: jest.fn().mockResolvedValue(userArray),
            findOne: jest.fn().mockResolvedValue(oneUser),
            findOneOrFail: jest
              .fn()
              .mockImplementation(async (searchOption: object | string) => {
                let user;
                if (typeof searchOption === 'string') {
                  user = userArray.find((user) => user.uuid === searchOption);
                } else {
                  user = userArray.find((user) =>
                    Object.keys(searchOption).every(
                      (key) => user[key] === searchOption[key],
                    ),
                  );
                }
                if (!user) {
                  throw new Error('User not found');
                }
                return user;
              }),
            save: jest.fn().mockResolvedValue(oneUser),
            remove: jest.fn(),
            delete: jest
              .fn()
              .mockImplementation(async (uuid: string) =>
                Boolean(userArray.findIndex((user) => user.uuid === uuid)),
              ),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create()', () => {
    it('should successfully insert a user', () => {
      expect(service.create(newUser)).resolves.toEqual(oneUser);
    });

    it('should throw an error if the user already exists', async () => {
      expect(service.create(oneUser)).rejects.toThrow('Bad Request Exception');
    });
  });

  describe('findAll()', () => {
    it('should successfully return all users', () => {
      expect(service.findAll()).resolves.toEqual(userArray);
    });
  });

  describe('findOne()', () => {
    it('should successfully return one user', () => {
      expect(service.findOne(oneUser.uuid)).resolves.toEqual(oneUser);
    });
  });

  describe('findOneWithPermissions()', () => {
    it('should successfully return one user with permissions', () => {
      expect(service.findOneWithPermissions(oneUser.uuid)).resolves.toEqual(
        oneUser,
      );
    });
  });

  describe('findOneByEmail()', () => {
    it('should successfully return one user by its email', () => {
      expect(service.findOneByEmail(oneUser.email)).resolves.toEqual(oneUser);
    });
  });

  describe('findOneByEmailOrFail', () => {
    it('should successfully return one user by its email', () => {
      expect(service.findOneByEmailOrFail(oneUser.email)).resolves.toEqual(
        oneUser,
      );
    });

    it('should throw an error if user is not found', () => {
      expect(service.findOneByEmailOrFail('not-found')).rejects.toThrowError();
    });
  });

  describe('update()', () => {
    it('should successfully update a user', () => {
      expect(service.update(oneUser.uuid, oneUser)).resolves.toEqual(oneUser);
    });
  });

  describe('remove()', () => {
    it('should successfully remove a user', () => {
      expect(service.remove(oneUser.uuid)).resolves.toBeTruthy;
    });

    it("should return false if the user can't be deleted", () => {
      expect(service.remove('not-found')).resolves.toBeFalsy;
    });
  });

  describe('comparePasswordWithHash()', () => {
    it('should successfully compare a password with a hash', () => {
      expect(
        service.comparePasswordWithHash(oneUser.password, oneUserPasswordHash),
      ).toBeTruthy;
    });

    it("should return false if the password doesn't match the hash", () => {
      expect(
        service.comparePasswordWithHash('not-matching', oneUserPasswordHash),
      ).toBeFalsy;
    });
  });

  describe('hashPassword()', () => {
    it('should successfully hash a password', () => {
      expect(service.hashPassword(oneUser.password)).toBeTruthy;
    });
  });
});
