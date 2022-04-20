import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UserType } from 'src/core/modules/user/entities/user.type';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { AuthValidateSuccessEvent } from '../events/auth-validate-success.event';
import { AuthValidateFailureEvent } from '../events/auth-validate-failure.event';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly eventEmitter: EventEmitter2,
  ) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<UserType> {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      this.eventEmitter.emit(AuthValidateFailureEvent.eventName, { email });
      throw new UnauthorizedException();
    }

    this.eventEmitter.emit(AuthValidateSuccessEvent.eventName, { user });
    return user;
  }
}
