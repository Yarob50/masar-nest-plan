import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Users')
export class User {
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
}

export enum Gender {
  Male = 'male',
  Female = 'female',
}
