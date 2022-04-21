import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { DatabaseModule } from './modules/database/database.module';
import { EventsModule } from './modules/events/events.module';
import { PermissionsModule } from './modules/permissions/permissions.module';
import { PuginLoaderModule } from './modules/pugin-loader/pugin-loader.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    DatabaseModule,
    EventsModule,
    PermissionsModule,
    PuginLoaderModule.register(),
  ],
})
export class CoreModule {}
