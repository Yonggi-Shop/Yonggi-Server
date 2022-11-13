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
import { LoginDto } from 'src/dto/Request/auth/login.requset.dto';
import { User } from './user.entity';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';

@ApiTags('User')
@Controller('user')
@UseInterceptors(SuccessInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({
    summary: '유저 정보 가져오기',
    description: '유저 정보 가져오기',
  })
  @Get()
  @UseGuards(JwtAuthGuard)
  getUser(@Query('id') id: string) {
    return this.userService.findUserHandler(id);
  }

  @Get('/recent')
  @UseGuards(JwtAuthGuard)
  getRecentSearch(@Req() req: Request) {
    const { userId } = req.body;
    return this.userService.getRecentSearchHandler(userId);
  }
}
