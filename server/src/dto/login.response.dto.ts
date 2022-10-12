import { Exclude } from 'class-transformer';

export class LoginResponseDto {
  userId: string;
  name: string;
  token: string;

  @Exclude({ toPlainOnly: true })
  password: string;

  constructor(partial: Partial<LoginResponseDto>) {
    Object.assign(this, partial);
  }
}
