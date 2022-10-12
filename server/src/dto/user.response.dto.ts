import { Exclude } from 'class-transformer';

export class UserResponseDto {
  userId: string;
  name: string;
  email: string;

  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }
}
