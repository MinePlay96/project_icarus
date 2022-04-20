import { UpdateEvent } from 'typeorm';
import { User } from '../entities/user.entity';

export class UserBeforeUpdateEvent {
  static readonly eventName = 'user.before.update';

  entity: UpdateEvent<User>['entity'];
  updatedColumns: UpdateEvent<User>['updatedColumns'];
  updatedRelations: UpdateEvent<User>['updatedRelations'];
}
