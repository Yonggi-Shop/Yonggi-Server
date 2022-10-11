import { Exclude } from 'class-transformer';

export class LoginResponseDto {
  userId: string;
  name: string;
  token: string;

  @Exclude()
  password: string;

  constructor(partial: Partial<LoginResponseDto>) {
    Object.assign(this, partial);
  }
}
