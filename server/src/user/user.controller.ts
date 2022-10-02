import { UserService } from './user.service';
import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { LoginDto } from 'src/dto/login.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async login(@Body() loginDto: LoginDto) {
    this.userService.login(loginDto);
  }
}
