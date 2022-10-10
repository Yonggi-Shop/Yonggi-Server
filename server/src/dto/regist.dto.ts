import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length, Max } from 'class-validator';

export class RegistDto {
  @ApiProperty({ description: '아이디' })
  @Length(2, 10)
  @IsString()
  userId: string;

  @ApiProperty({ description: '비밀번호' })
  @Length(8, 50)
  @IsString()
  password: string;

  @ApiProperty({ description: '이름' })
  @Length(2, 15)
  @IsString()
  name: string;

  @ApiProperty({ description: '이메일' })
  @IsEmail()
  email: string;
}
