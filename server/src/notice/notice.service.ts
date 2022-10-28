import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateNoticeDto } from 'src/dto/Request/notice/create.notice.dto';
import { DeleteNoticeDto } from 'src/dto/Request/notice/delete.notice.dto';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Notice } from './notice.entity';

@Injectable()
export class NoticeService {
  constructor(
    @InjectRepository(Notice)
    private readonly noticeRepository: Repository<Notice>,
  ) {}

  async getNoticeHandler(): Promise<any> {
    try {
      const noticeArr = await this.noticeRepository
        .createQueryBuilder('notice')
        .select('id,notice,createdAt')
        .orderBy('notice.createdAt', 'DESC')
        .getRawMany();
      return noticeArr;
    } catch (e) {
      throw new UnauthorizedException('공지글을 가져오는데 실패하였습니다.');
    }
  }

  async createNotice(noticeData: CreateNoticeDto): Promise<Notice> {
    try {
      const { notice } = noticeData;
      const onCreateaNotice = await this.noticeRepository.save({ notice });
      return onCreateaNotice;
    } catch (e) {
      throw new UnauthorizedException('공지글 작성에 실패하였습니다.');
    }
  }

  async deleteNotice(id: DeleteNoticeDto): Promise<Notice> {
    try {
      const { noticeId } = id;
      const notice = await this.noticeRepository.findOneBy({
        id: parseInt(noticeId),
      });

      if (!notice) {
        throw new UnauthorizedException('존재하지 않는 공지글입니다.');
      } else {
        return this.noticeRepository.remove(notice);
      }
    } catch (e) {
      throw new UnauthorizedException('공지글 삭제에 실패하였습니다.');
    }
  }
}
