import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, Max } from 'class-validator';

export class CreateNoticeDto {
  @ApiProperty({ description: '공지글' })
  @IsString()
  notice: string;
}
