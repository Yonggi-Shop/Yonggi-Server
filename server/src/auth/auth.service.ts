import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DatabaseModule } from 'src/db/database.module';
import { LoginDto } from 'src/dto/Request/auth/login.requset.dto';
import { RegistDto } from 'src/dto/Request/auth/regist.requset.dto';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginResponseDto } from 'src/dto/Response/login.response.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async login(user: LoginDto): Promise<LoginResponseDto> {
    const { userId, password } = user;
    const getUser = await this.userRepository.findOne({ where: { userId } });
    if (!getUser) {
      throw new UnauthorizedException('존재하지 않는 아이디입니다.');
    }

    //password체크
    const isPasswordValidated: boolean = await bcrypt.compare(
      password,
      getUser.password,
    );

    if (!isPasswordValidated) {
      throw new UnauthorizedException('패스워드를 확인해주세요.');
    }

    const payload = { userId, sub: getUser.userId };
    const token = this.jwtService.sign(payload);
    const resultObj = {
      userId: getUser.userId,
      name: getUser.name,
      email: getUser.email,
      token: `Authentication=${token}; HttpOnly; Path=/; Max-Age=36000`,
    };
    return resultObj;
  }

  async findUserByWithoutPassword(userId: string): Promise<User | null> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .select(['user.userId', 'user.name'])
      .where('user.userId = :id', { id: userId })
      .getOne();
    return user;
  }

  async regist(user: RegistDto): Promise<any> {
    try {
      const { userId, password, email, name } = user;
      const getUser = await this.userRepository.findOne({ where: { userId } });
      if (getUser) {
        throw new UnauthorizedException('이미 존재하는 아이디입니다.');
      } else {
        const hashedPassword = await bcrypt.hash(user.password, 12);
        const registUser = await this.userRepository.save({
          userId,
          password: hashedPassword,
          name,
          email,
        });
        return registUser;
      }
    } catch (e) {
      throw new UnauthorizedException(e);
    }
  }
}
