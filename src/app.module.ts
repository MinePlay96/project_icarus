import { Module } from '@nestjs/common';
import { ExampleModule } from './plugins/example/example.module';
import { CoreModule } from './core/core.module';

@Module({
  imports: [CoreModule, ExampleModule],
})
export class AppModule {}
