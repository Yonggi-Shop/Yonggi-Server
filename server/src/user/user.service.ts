import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDto } from 'src/dto/Request/auth/login.requset.dto';
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

  async findUserHandler(userId: string): Promise<any> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .select(['user.userId', 'user.name'])
      .where('user.userId = :id', { id: userId })
      .getOne();
    if (user) {
      const obj = {
        userId: user.userId,
        email: user.email,
        name: user.name,
      };
      return obj;
    } else {
      throw new UnauthorizedException('존재하지않는 회원입니다.');
    }
  }

  async getRecentSearchHandler(userId: string): Promise<any> {
    try {
      const recents = await this.userRepository.findOneBy({ userId });
      const { recentSearch } = recents;
      return recentSearch;
    } catch (e) {
      throw new UnauthorizedException('최근 검색어를 가져올 수 없습니다.');
    }
  }
}
