import { Injectable, NotAcceptableException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/core/modules/user/entities/user.entity';
import { UserService } from 'src/core/modules/user/user.service';
import { CreateUserDto } from 'src/core/modules/user/dto/create-user.dto';
import { UserType } from 'src/core/modules/user/entities/user.type';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<null | UserType> {
    try {
      // TODO: event driven auth
      // const test = await this.eventEmitter.emitAsync('userprovider.validate', {
      //   email,
      //   password,
      // });

      // console.log(test);
      const user = await this.userService.findOneByEmailOrFail(email);

      let match = await this.userService.comparePasswordWithHash(
        user.password,
        password,
      );

      if (!match) {
        throw new NotAcceptableException('Invalid credentials');
      }

      return user;
    } catch (error) {
      return null;
    }
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

  // @OnEvent('userprovider.validate')
  // async localUserAuthProvider({ email, password }) {
  //   return this.localUserAuthProvider(email, password);
  // }

}
