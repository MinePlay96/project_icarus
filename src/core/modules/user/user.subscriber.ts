import { EventEmitter2 } from '@nestjs/event-emitter';
import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { User } from './entities/user.entity';
import { UserAfterInsertEvent } from './events/user-after-insert.event';
import { UserAfterUpdateEvent } from './events/user-after-update.event';
import { UserBeforeInsertEvent } from './events/user-before-insert.event';
import { UserBeforeUpdateEvent } from './events/user-before-update.event';
import { UserService } from './user.service';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  constructor(
    connection: Connection,
    private userService: UserService,
    private eventEmitter: EventEmitter2,
  ) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return User;
  }

  async beforeInsert({ entity }: InsertEvent<User>): Promise<void> {
    this.eventEmitter.emit(UserBeforeInsertEvent.eventName, { entity });

    entity.password = await this.userService.hashPassword(entity.password);
  }

  afterInsert({ entity }: InsertEvent<User>): void {
    this.eventEmitter.emit(UserAfterInsertEvent.eventName, { entity });
  }

  async beforeUpdate({
    entity,
    updatedColumns,
    updatedRelations,
  }: UpdateEvent<User>): Promise<void> {
    this.eventEmitter.emit(UserBeforeUpdateEvent.eventName, {
      entity,
      updatedColumns,
      updatedRelations,
    });

    if (updatedColumns.find((column) => column.propertyName === 'password')) {
      entity.password = await this.userService.hashPassword(entity.password);
    }
  }

  afterUpdate({
    entity,
    updatedColumns,
    updatedRelations,
  }: UpdateEvent<User>): void {
    this.eventEmitter.emit(UserAfterUpdateEvent.eventName, {
      entity,
      updatedColumns,
      updatedRelations,
    });
  }
}
