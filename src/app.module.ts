import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { LocalAuthModule } from './plugins/local-auth/local-auth.module';
import { LocalUserHandlerModule } from './plugins/local-user-handler/local-user-handler.module';

@Module({
  imports: [CoreModule, LocalAuthModule, LocalUserHandlerModule],
})
export class AppModule {}
