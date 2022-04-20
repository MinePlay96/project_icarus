import { User } from '../../user/entities/user.entity';

export class AuthValidateFailureEvent {
  static readonly eventName = 'auth.validate.failure';

  user: User;
}
