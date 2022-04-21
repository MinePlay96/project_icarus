import { Module } from '@nestjs/common';
import { AuthModule } from '@project-icarus/auth';
import { PermissionsModule } from './modules/permissions';
import { UserModule } from './modules/user/user.module';
import { DatabaseModule } from './modules/database/database.module';
import { EventsModule } from './modules/events/events.module';
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
