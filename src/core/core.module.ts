import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { DatabaseModule } from './modules/database/database.module';
import { EventsModule } from './modules/events/events.module';

@Module({
  imports: [AuthModule, UserModule, DatabaseModule, EventsModule],
})
export class CoreModule {}
