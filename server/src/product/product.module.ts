import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [ProductController],
  exports: [ProductService],
})
export class ProductModule {}
