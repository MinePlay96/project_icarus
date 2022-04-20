import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { compare, genSalt, hash } from 'bcrypt';
import { Repository } from 'typeorm';
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

  public findOne(uuid: string): Promise<User> {
    return this.userRepository.findOneOrFail(uuid);
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
    const user = await this.findOne(uuid);

    Object.keys(updateUserDto).forEach((key) => {
      user[key] = updateUserDto[key];
    });

    return this.userRepository.save(user);
  }

  public remove(uuid: string) {
    return this.userRepository.delete(uuid);
  }

  public comparePassword(user: User, password: string): Promise<boolean> {
    return compare(password, user.password);
  }

  public async hashPassword(password: string): Promise<string> {
    const salt = await genSalt(this.config.saltRounds);
    return await hash(password, salt);
  }
}
