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
  Query,
} from '@nestjs/common';
import { LoginDto } from 'src/dto/Request/login.requset.dto';
import { User } from './user.entity';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getUser(@Query('id') id: string) {
    return this.userService.getUser(id);
  }
}
