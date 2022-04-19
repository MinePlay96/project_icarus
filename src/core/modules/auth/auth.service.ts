import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/core/modules/user/entities/user.entity';
import { UserService } from 'src/core/modules/user/user.service';
import { ConfigType } from '@nestjs/config';
import authConfig from './auth.config';
import { CreateUserDto } from 'src/core/modules/user/dto/create-user.dto';
import { UserType } from 'src/core/modules/user/entities/user.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @Inject(authConfig.KEY)
    private readonly config: ConfigType<typeof authConfig>,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<null | UserType> {
    const user = await this.userService.findOneByEmail(email);
    const match = await this.userService.comparePassword(user, password);

    if (user && match) {
      return user;
    }

    return null;
  }

  async login(user: User) {
    const payload = { email: user.email, sub: user.uuid };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user: CreateUserDto): Promise<UserType> {
    return await this.userService.create(user);
  }
}
