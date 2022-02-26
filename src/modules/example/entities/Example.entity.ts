import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Example {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public title: string;

  @Column()
  public description: string;

  @Column()
  public customers: Array<Customer>
}
