import { IsNotEmpty } from 'class-validator';

export class CreateExampleDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}
