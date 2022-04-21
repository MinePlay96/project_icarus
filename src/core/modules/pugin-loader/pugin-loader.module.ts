import { DynamicModule, Module } from '@nestjs/common';
import { readdir } from 'fs/promises';
import { join } from 'path';

@Module({})
export class PuginLoaderModule {
  static async register(): Promise<DynamicModule> {
    // TODO: put in own class / file
    // TODO: use correct logger
    console.log('loading plugins');
    const PLUGIN_DIR = join(__dirname, '../../../plugins');
    const pluginFolderContent = await readdir(PLUGIN_DIR, {
      withFileTypes: true,
    });
    const pluginDirs = pluginFolderContent
      .filter((dirContent) => dirContent.isDirectory())
      .map((dirContent) => dirContent.name);

    const modulePromises = pluginDirs.map(async (name) => {
      const plugin = await import(join(PLUGIN_DIR, name));
      return plugin.default as DynamicModule;
    });

    return {
      imports: modulePromises,
      module: PuginLoaderModule,
    };
  }
}
