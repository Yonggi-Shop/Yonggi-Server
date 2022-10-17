import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { logger } from './common/middlewares/logger.middleware';
import { User } from './user/user.entity';
import { env } from 'process';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';
import { APP_FILTER } from '@nestjs/core';
import { ProductController } from './product/product.controller';
import { ProductModule } from './product/product.module';
import { NoticeController } from './notice/notice.controller';
import { NoticeService } from './notice/notice.service';
import { Notice } from './notice/notice.entity';
import { Product } from './product/product.entity';

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    NoticeService,
  ],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: env.DATABASE_URL,
      port: 3306,
      username: env.DATABASE_ID,
      password: env.DATABASE_PASSWORD,
      database: env.DATABASE_NAME,
      entities: [User, Notice, Product],
      synchronize: false,
      autoLoadEntities: true,
    }),
    AuthModule,
    UserModule,
    ProductModule,
  ],
  controllers: [NoticeController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(logger).forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
