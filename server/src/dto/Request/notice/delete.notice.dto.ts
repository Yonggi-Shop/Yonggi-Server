import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, Max } from 'class-validator';

export class DeleteNoticeDto {
  @ApiProperty({ description: '공지 아이디' })
  @IsString()
  noticeId: string;
}
