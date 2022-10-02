import { Injectable } from '@nestjs/common';
import { DatabaseModule } from 'src/db/database.module';
import { LoginDto } from 'src/dto/login.dto';
import { User } from 'src/interface/User';

@Injectable()
export class AuthService {
  private readonly user: User[] = [];

  login(login: LoginDto): User[] {
    return this.user;
  }
}
