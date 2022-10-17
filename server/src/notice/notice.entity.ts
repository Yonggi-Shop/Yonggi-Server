import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Notice' })
export class Notice {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: '공지글' })
  @Column({ unique: true, type: 'varchar' })
  notice: string;

  @Column({
    default: new Intl.DateTimeFormat('ko', {
      dateStyle: 'long',
      timeStyle: 'medium',
    }).format(new Date()),
  })
  createdAt: string;
}
