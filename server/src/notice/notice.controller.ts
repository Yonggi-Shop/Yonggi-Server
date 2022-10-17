import { Controller, Get } from '@nestjs/common';
import { NoticeService } from './notice.service';

@Controller('notice')
export class NoticeController {
  constructor(private readonly noticeService: NoticeService) {}

  @Get()
  getNotice() {
    return this.noticeService.getNotice();
  }
}
