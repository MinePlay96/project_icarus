import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Permission {
  @PrimaryColumn({ type: 'varchar', length: 255 })
  public name: string;

  @Column()
  public description: string;
}
