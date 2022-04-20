import { InsertEvent } from 'typeorm';
import { User } from '../entities/user.entity';

export class UserAfterInsertEvent {
  static readonly eventName = 'user.after.insert';

  entity: InsertEvent<User>['entity'];
}
