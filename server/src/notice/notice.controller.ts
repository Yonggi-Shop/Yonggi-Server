import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CreateNoticeDto } from 'src/dto/Request/notice/create.notice.dto';
import { DeleteNoticeDto } from 'src/dto/Request/notice/delete.notice.dto';
import { NoticeService } from './notice.service';

@Controller('notice')
export class NoticeController {
  constructor(private readonly noticeService: NoticeService) {}

  @Get()
  getNotice() {
    return this.noticeService.getNoticeHandler();
  }

  @Post()
  //배포할떄는 로그인넣어줘야함
  // @UseGuards(JwtAuthGuard)
  createNotice(@Body() createDto: CreateNoticeDto) {
    return this.noticeService.createNotice(createDto);
  }

  @Delete()
  // @UseGuards(JwtAuthGuard)
  deleteNotice(@Query('id') id: DeleteNoticeDto) {
    return this.noticeService.deleteNotice(id);
  }
}
