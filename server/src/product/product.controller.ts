import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { createProductDto } from 'src/dto/Request/product/create.product.dto';
import { Product } from './product.entity';
import { ProductService } from './product.service';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @ApiOperation({
    summary: '상품 리스트 가져오기',
    description: '상품 리스트 가져오기',
  })
  getProducts() {
    return this.productService.getProductsHandler();
  }

  @Get('/search')
  @ApiOperation({ summary: '상품 검색', description: '상품 검색' })
  searchProducts(@Query('productName') productName: string) {
    return this.productService.searchProductsHandler(productName);
  }

  @Post()
  @ApiOperation({ summary: '상품 등록', description: '상품 등록' })
  createProduct(@Body() product: createProductDto) {
    return this.productService.createProductHandler(product);
  }
}
