import { UpdateEvent } from 'typeorm';
import { User } from '../entities/user.entity';

export class UserAfterUpdateEvent {
  static readonly eventName = 'user.after.update';

  entity: UpdateEvent<User>['entity'];
  updatedColumns: UpdateEvent<User>['updatedColumns'];
  updatedRelations: UpdateEvent<User>['updatedRelations'];
}
