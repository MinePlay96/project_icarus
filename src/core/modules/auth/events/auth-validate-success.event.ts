import { User } from '../../user/entities/user.entity';

export class AuthValidateSuccessEvent {
  static readonly eventName = 'auth.validate.success';

  user: User;
}
