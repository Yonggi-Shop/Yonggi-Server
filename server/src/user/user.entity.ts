import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  userId: string;

  @Column('varchar')
  password: string;

  @Column('varchar')
  name: string;
}
