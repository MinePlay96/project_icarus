import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateExampleDto } from './dto/create-example.dto';
import { UpdateExampleDto } from './dto/update-example.dto';
import { Example } from './entities/Example.entity';

@Injectable()
export class ExampleService {
  constructor(
    @InjectRepository(Example)
    private exampleRepository: Repository<Example>,
  ) {}

  create(createExampleDto: CreateExampleDto): Promise<Example> {
    const example = this.exampleRepository.create(createExampleDto);
    return this.exampleRepository.save(example);
  }

  findAll(): Promise<Array<Example>> {
    return this.exampleRepository.find();
  }

  findOne(id: string): Promise<Example> {
    return this.exampleRepository.findOneOrFail(id);
  }

  async update(
    id: string,
    updateExampleDto: UpdateExampleDto,
  ): Promise<Example> {
    const example = await this.findOne(id);

    Object.keys(updateExampleDto).forEach((key) => {
      example[key] = updateExampleDto[key];
    });

    return this.exampleRepository.save(example);
  }

  async remove(id: string): Promise<void> {
    await this.exampleRepository.delete(id);
  }
}
