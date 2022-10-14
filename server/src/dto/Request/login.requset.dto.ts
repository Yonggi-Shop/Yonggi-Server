import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, Max } from 'class-validator';

export class LoginDto {
  @ApiProperty({ description: '아이디' })
  @IsString()
  userId: string;

  @ApiProperty({ description: '비밀번호' })
  @Length(8, 50)
  @IsString()
  password: string;
}
