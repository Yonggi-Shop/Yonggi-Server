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

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
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
      entities: [User],
      synchronize: false,
      autoLoadEntities: true,
    }),
    AuthModule,
    UserModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(logger).forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
