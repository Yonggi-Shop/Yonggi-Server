import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { LoginDto } from 'src/dto/login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
@UseInterceptors(SuccessInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get()
  findAll(): string {
    return 'all Users';
  }
  @Post()
  async login(@Res() res: Response, @Body() loginDto: LoginDto) {
    this.authService.login(loginDto);
  }
}
