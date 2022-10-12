import { UserService } from './user.service';
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { LoginDto } from 'src/dto/login.dto';
import { User } from './user.entity';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { UserResponseDto } from 'src/dto/user.response.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getUser(@Query('id') id: string): UserResponseDto {
    return this.userService.getUser(id);
  }
}
