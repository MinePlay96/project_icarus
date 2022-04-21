import { PartialType } from '@nestjs/mapped-types';
import { CreateTestPluginDto } from './create-test-plugin.dto';

export class UpdateTestPluginDto extends PartialType(CreateTestPluginDto) {}
