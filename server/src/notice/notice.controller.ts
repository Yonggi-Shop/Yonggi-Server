import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CreateNoticeDto } from 'src/dto/Request/notice/create.notice.dto';
import { DeleteNoticeDto } from 'src/dto/Request/notice/delete.notice.dto';
import { NoticeService } from './notice.service';
@ApiTags('Notice')
@Controller('notice')
export class NoticeController {
  constructor(private readonly noticeService: NoticeService) {}

  @Get()
  @ApiOperation({ summary: '공지글 가져오기', description: '공지글 가져오기' })
  getNotice() {
    return this.noticeService.getNoticeHandler();
  }

  @Post()
  @ApiOperation({ summary: '공지글 작성', description: '공지글 작성' })
  //배포할떄는 로그인넣어줘야함
  // @UseGuards(JwtAuthGuard)
  createNotice(@Body() createDto: CreateNoticeDto) {
    return this.noticeService.createNotice(createDto);
  }

  @Delete()
  @ApiOperation({ summary: '공지글 삭제', description: '공지글 삭제' })
  // @UseGuards(JwtAuthGuard)
  deleteNotice(@Query('id') id: DeleteNoticeDto) {
    return this.noticeService.deleteNotice(id);
  }
}
