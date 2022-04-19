import { Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { event } from 'eventemitter2';
import { Repository } from 'typeorm';
import { CreateExampleDto } from './dto/create-example.dto';
import { UpdateExampleDto } from './dto/update-example.dto';
import { Example } from './entities/Example.entity';

@Injectable()
export class ExampleService {
  constructor(
    @InjectRepository(Example)
    private exampleRepository: Repository<Example>,
    private eventEmitter: EventEmitter2,
  ) {}

  create(createExampleDto: CreateExampleDto): Promise<Example> {
    const example = this.exampleRepository.create(createExampleDto);
    return this.exampleRepository.save(example);
  }

  findAll(): Promise<Array<Example>> {
    const event = this.eventEmitter.emitAsync('example.findAll');
    console.log(event);
    return this.exampleRepository.find();
  }

  @OnEvent('example.findAll')
  async onEvent(payload: { number }, event: event) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(payload);
    return false;
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
