import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Product' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: '상품이름' })
  @Column({ unique: true, type: 'varchar' })
  productName: string;

  @ApiProperty({ description: '카테고리' })
  @Column({ type: 'varchar' })
  category: string;

  @ApiProperty({ description: '판매가' })
  @Column('int')
  price: number;

  @ApiProperty({ description: '할인가' })
  @Column('int')
  salePrice: number;

  @ApiProperty({ description: '재고' })
  @Column('int')
  quantity: number;

  @ApiProperty({ description: '대표이미지' })
  @Column('varchar')
  thumbnail: string;

  @ApiProperty({ description: '옵션' })
  @Column('varchar')
  option: string;

  @ApiProperty({ description: '상세설명' })
  @Column('varchar')
  detailContext: string;

  @ApiProperty({ description: '사이즈' })
  @Column('int')
  size: number;

  @ApiProperty({ description: '태그' })
  @Column('varchar')
  tag: string;

  @ApiProperty({ description: '유형' })
  @Column('varchar')
  type: string;

  @ApiProperty({ description: '상품상태' })
  @Column('varchar')
  status: string;

  @ApiProperty({ description: '연관상품' })
  @Column('varchar')
  relatedProducts: string;

  @ApiProperty({ description: '댓글수' })
  @Column('int')
  commentCnt: number;

  @ApiProperty({ description: '평점' })
  @Column('int')
  score: string;

  @Column({
    default: new Intl.DateTimeFormat('ko', {
      dateStyle: 'long',
      timeStyle: 'medium',
    }).format(new Date()),
  })
  createdAt: string;
}
