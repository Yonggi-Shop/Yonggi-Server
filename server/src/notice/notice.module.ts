import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoticeController } from './notice.controller';
import { Notice } from './notice.entity';
import { NoticeService } from './notice.service';

@Module({
  imports: [TypeOrmModule.forFeature([Notice])],
  exports: [NoticeService],
  providers: [NoticeService],
  controllers: [NoticeController],
})
export class NoticeModule {}
