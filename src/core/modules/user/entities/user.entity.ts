import { Exclude } from 'class-transformer';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Permission } from '../../permissions/entities/permission.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  public uuid: string;

  @Column({ unique: true })
  public email: string;

  @Exclude()
  @Column()
  public password: string;

  @Column()
  public firstName: string;

  @Column()
  public lastName: string;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @DeleteDateColumn()
  public deleteAt: Date;

  @ManyToMany(() => Permission)
  @JoinTable()
  public permissions: Permission[];

  @BeforeInsert()
  protected emailToLowerCase() {
    this.email = this.email.toLowerCase();
  }
}
