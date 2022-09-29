import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { LoginDto } from 'src/dto/login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Get()
  findAll(): string {
    return 'all Users';
  }
  @Post()
  async login(@Res() res: Response, @Body() loginDto: LoginDto) {
    this.authService.login(loginDto);
  }
}
