import { DynamicModule, Module } from '@nestjs/common';
import { join } from 'path';

@Module({})
export class PuginLoaderModule {
  static async register(): Promise<DynamicModule> {
    const modulePaths = [
      join(__dirname, '../../../plugins/test-plugin/test-plugin.module'),
    ];
    const modulePromises = modulePaths.map(async (path) => {
      const { TestPluginModule } = await import(path);
      return TestPluginModule as DynamicModule;
    });

    return {
      imports: modulePromises,
      module: PuginLoaderModule,
    };
  }
}
