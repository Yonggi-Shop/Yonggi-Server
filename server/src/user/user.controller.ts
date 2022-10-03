import { UserService } from './user.service';
import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  Req,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { LoginDto } from 'src/dto/login.dto';
import { User } from './user.entity';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getUser(@Req() req: Request, user: User) {
    return this.userService.getUser(user);
  }
}
