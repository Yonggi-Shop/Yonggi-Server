import { IsString, Length, Max } from 'class-validator';

export class LoginDto {
  @Max(20)
  @IsString()
  userId: string;

  @Length(8, 50)
  @IsString()
  password: string;
}
