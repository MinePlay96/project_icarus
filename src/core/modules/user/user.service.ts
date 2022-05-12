import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { compare, genSalt, hash } from 'bcrypt';
import { EntityNotFoundError, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import userConfig from './user.config';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @Inject(userConfig.KEY)
    private config: ConfigType<typeof userConfig>,
  ) {}

  public async create(createUserDto: CreateUserDto): Promise<User> {
    if (await this.findOneByEmail(createUserDto.email)) {
      throw new BadRequestException([
        'Account with this email already exists.',
      ]);
    }

    const user = this.userRepository.create(createUserDto);

    return this.userRepository.save(user);
  }

  public findAll(): Promise<Array<User>> {
    return this.userRepository.find();
  }

  public async findOne(uuid: string): Promise<User> {
    try {
      return await this.userRepository.findOneOrFail(uuid);
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException('User not found');
      }

      throw new InternalServerErrorException(error);
    }
  }

  public findOneWithPermissions(uuid: string): Promise<User> {
    return this.userRepository.findOneOrFail(uuid, {
      relations: ['permissions'],
    });
  }

  public findOneByEmail(email: string): Promise<User | null> {
    return this.findOneByEmailOrFail(email).catch(() => null);
  }

  public findOneByEmailOrFail(email: string): Promise<User> {
    return this.userRepository.findOneOrFail({ email });
  }

  public async update(
    uuid: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    if (Object.keys(updateUserDto).length === 0) {
      throw new BadRequestException('No data to update');
    }

    const user = await this.findOne(uuid);

    Object.keys(updateUserDto).forEach((key) => {
      user[key] = updateUserDto[key];
    });

    return this.userRepository.save(user);
  }

  public async remove(uuid: string): Promise<boolean> {
    const user = await this.findOne(uuid);
    try {
      await this.userRepository.delete(user);
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException('User not found');
      }

      throw new InternalServerErrorException(error);
    }

    return true;
  }

  public comparePasswordWithHash(
    hash: string,
    password: string,
  ): Promise<boolean> {
    return compare(password, hash);
  }

  public async hashPassword(password: string): Promise<string> {
    const salt = await genSalt(this.config.saltRounds);
    return await hash(password, salt);
  }
}
