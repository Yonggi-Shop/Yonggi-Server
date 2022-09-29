import { Injectable } from '@nestjs/common';
import { User } from 'src/interface/User';

@Injectable()
export class AuthService {
  private readonly user: User[] = [];

  login(user: User): User[] {
    return this.user;
  }
}
