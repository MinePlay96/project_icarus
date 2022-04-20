import { Test, TestingModule } from '@nestjs/testing';
import { EntityNotFoundError } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;

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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: UserService,
          useValue: {
            create: jest.fn().mockResolvedValue(oneUser),
            findAll: jest.fn().mockResolvedValue(userArray),
            findOne: jest.fn().mockResolvedValue(oneUser),
            findOneOrFail: jest.fn().mockResolvedValue(oneUser),
            update: jest.fn().mockResolvedValue(oneUser),
            remove: jest.fn().mockResolvedValue(oneUser),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create()', () => {
    it('should create a user and return it', async () => {
      const createUser: CreateUserDto = {
        email: 'email',
        password: 'password',
        firstName: 'firstName',
        lastName: 'lastName',
      };

      expect(await controller.create(createUser)).toEqual(oneUser);
    });
  });

  describe('findAll()', () => {
    it('should return all users', async () => {
      expect(await controller.findAll()).toEqual(userArray);
    });
  });

  describe('findOne()', () => {
    it('should return a user', async () => {
      expect(await controller.findOne('uuid')).toEqual(oneUser);
    });
  });

  describe('update()', () => {
    it('should update a user and return it', async () => {
      const updateUser: UpdateUserDto = {
        email: 'email',
      };

      expect(await controller.update('uuid', updateUser)).toEqual(oneUser);
    });
  });

  describe('remove()', () => {
    it('should remove a user and return it', async () => {
      expect(await controller.remove('uuid')).toEqual(oneUser);
    });
  });
});
