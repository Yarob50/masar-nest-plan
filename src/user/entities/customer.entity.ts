import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Customers')
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  age: number;

  @Column({ nullable: true })
  gender: Gender;

  @Column({ nullable: true })
  city: string;
}

export enum Gender {
  Male = 'male',
  Female = 'female',
}
