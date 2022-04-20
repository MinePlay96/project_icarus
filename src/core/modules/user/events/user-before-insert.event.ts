import { InsertEvent } from 'typeorm';
import { User } from '../entities/user.entity';

export class UserBeforeInsertEvent {
  static readonly eventName = 'user.before.insert';

  entity: InsertEvent<User>['entity'];
}
