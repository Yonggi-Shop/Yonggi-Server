import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { LoginDto } from 'src/dto/login.dto';
import { RegistDto } from 'src/dto/regist.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt/jwt.guard';

@ApiTags('Auth')
@ApiResponse({ status: 200, description: '성공' })
@Controller('auth')
@UseInterceptors(SuccessInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get()
  findAll(): string {
    return 'all Users';
  }

  @Post('login')
  @ApiOperation({ summary: '유저 로그인', description: '로그인' })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('regist')
  @ApiOperation({ summary: '유저 회원가입', description: '회원가입' })
  @ApiBody({ type: RegistDto })
  regist(@Body() registDto: RegistDto) {
    return this.authService.regist(registDto);
  }
}
