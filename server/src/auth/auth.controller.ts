import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { LoginDto } from 'src/dto/login.dto';
import { RegistDto } from 'src/dto/regist.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt/jwt.guard';

@Controller('auth')
@UseInterceptors(SuccessInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get()
  findAll(): string {
    return 'all Users';
  }
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
  @Post('regist')
  async regist(@Body() registDto: RegistDto) {
    await this.authService.regist(registDto);
  }
}
