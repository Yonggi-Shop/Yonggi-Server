import { IsString, Length, Max } from 'class-validator';

export class LoginDto {
  @Max(20)
  @IsString()
  id: string;

  @Length(8, 50)
  @IsString()
  password: string;
}
