import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SearchProductDto {
  @ApiProperty({ description: '상품명' })
  @IsString()
  productName: string;

  @ApiProperty({
    required: false,
    description: '유저 아이디',
  })
  @IsString()
  userId?: string;
}
