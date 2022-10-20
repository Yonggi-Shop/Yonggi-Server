import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { createProductDto } from 'src/dto/Request/product/create.product.dto';
import { Product } from './product.entity';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  getProducts() {
    return this.productService.getProductsHandler();
  }

  @Get('/search')
  searchProducts(@Query('productName') productName: string) {
    return this.productService.searchProductsHandler(productName);
  }

  @Post()
  createProduct(@Body() product: createProductDto) {
    return this.productService.createProductHandler(product);
  }
}
