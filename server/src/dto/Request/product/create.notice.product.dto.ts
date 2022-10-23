import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateNoticeProductDto {
  @ApiProperty({ description: '공지 상품 아이디' })
  @IsNumber()
  id: number;

  @ApiProperty({ description: '공지 상품 이미지' })
  @IsString()
  img: string;

  @ApiProperty({ description: '공지 상품 링크' })
  @IsString()
  link: string;
}
