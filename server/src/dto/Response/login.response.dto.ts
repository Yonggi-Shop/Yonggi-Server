import { Exclude } from 'class-transformer';

export class LoginResponseDto {
  userId: string;
  name: string;
  email: string;
  token: string;
}
