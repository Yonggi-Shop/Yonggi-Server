import { IsEmail, IsString, Length, Max } from 'class-validator';

export class RegistDto {
  @Length(2, 10)
  @IsString()
  userId: string;

  @Length(8, 50)
  @IsString()
  password: string;

  @Length(2, 15)
  @IsString()
  name: string;

  @IsEmail()
  email: string;
}
