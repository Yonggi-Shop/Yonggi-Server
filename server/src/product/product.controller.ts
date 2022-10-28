import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateNoticeProductDto } from 'src/dto/Request/product/create.notice.product.dto';
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
  getProducts(@Query() paginationQuery) {
    const { start, limit } = paginationQuery;
    return this.productService.getProductsHandler(start, limit);
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

  @Post('/noice')
  @ApiOperation({ summary: '공지 상품 등록', description: '공지 상품 등록' })
  createNoticeProduct(@Body() noticeProduct: CreateNoticeProductDto) {
    return this.productService.createNoticeProductHandler(noticeProduct);
  }

  @Get('/notice')
  @ApiOperation({
    summary: '공지 상품 가져오기',
    description: '공지 상품 기져오기',
  })
  getNoticeProducts() {
    return this.productService.getNoticeProductsHandler();
  }
}
