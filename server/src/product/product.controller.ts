import { Controller, Get, Query } from '@nestjs/common';
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
}
