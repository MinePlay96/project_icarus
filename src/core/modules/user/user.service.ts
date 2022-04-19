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

  async create(createUserDto: CreateUserDto): Promise<User> {
    if (await this.findOneByEmail(createUserDto.email)) {
      throw new BadRequestException([
        'Account with this email already exists.',
      ]);
    }

    const user = this.userRepository.create(createUserDto);
    user.password = await this.hashPassword(user.password);

    return this.userRepository.save(user);
  }

  findAll(): Promise<Array<User>> {
    return this.userRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.userRepository.findOneOrFail(id);
  }

  findOneByEmail(email: string): Promise<User> {
    return this.userRepository.findOneOrFail({ email });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);

    Object.keys(updateUserDto).forEach((key) => {
      user[key] = updateUserDto[key];
    });

    if (updateUserDto.password) {
      user.password = await this.hashPassword(updateUserDto.password);
    }

    return this.userRepository.save(user);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }

  comparePassword(user: User, password: string): Promise<boolean> {
    return compare(password, user.password);
  }

  protected async hashPassword(password: string): Promise<string> {
    const salt = await genSalt(this.config.saltRounds);
    return await hash(password, salt);
  }
}
