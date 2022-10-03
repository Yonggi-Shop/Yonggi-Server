import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDto } from 'src/dto/login.dto';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async allUser() {
    return await this.userRepository.find();
  }

  async getUser(userId: string) {
    const result = await this.userRepository
      .createQueryBuilder('user')
      .select(['user.userId', 'user.name'])
      .where('user.userId = :id', { id: userId })
      .getOne();
    if (result) {
      return result;
    } else {
      throw new UnauthorizedException('존재하지않는 회원입니다.');
    }
  }
}
