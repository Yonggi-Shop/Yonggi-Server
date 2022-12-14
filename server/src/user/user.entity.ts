import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, type: 'varchar' })
  userId: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column('varchar')
  name: string;

  @Column('varchar')
  email: string;

  @Column({
    default: new Intl.DateTimeFormat('ko', {
      dateStyle: 'long',
      timeStyle: 'medium',
    }).format(new Date()),
  })
  createdAt: string;

  @Column({ nullable: true })
  authStrategy: string;

  @Column('json')
  recentSearch: string;
}
