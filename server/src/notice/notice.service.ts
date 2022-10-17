import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Notice } from './notice.entity';

@Injectable()
export class NoticeService {
  constructor(private readonly noticeRepository: Repository<Notice>) {}

  async getNotice() {
    try {
      const noticeArr = this.noticeRepository
        .createQueryBuilder('notice')
        .orderBy('notice.createdAt', 'DESC');
      return noticeArr;
    } catch (e) {
      console.log(e);
    }
  }
}
