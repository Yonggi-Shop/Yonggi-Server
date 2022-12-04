import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { CreateNoticeProductDto } from 'src/dto/Request/product/create.notice.product.dto';
import { createProductDto } from 'src/dto/Request/product/create.product.dto';
import {
  SearchProductDto,
  SearchProductNameDto,
} from 'src/dto/Request/product/search.product.dto';
import { Product } from './product.entity';
import { ProductService } from './product.service';

@ApiTags('Product')
@Controller('product')
@UseInterceptors(SuccessInterceptor)
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

  @Get(':id')
  @ApiOperation({
    summary: '상품 상세 가져오기',
    description: '상품 상세 가져오기',
  })
  findOneProduct(@Param('id') id: number) {
    return this.productService.findProductHandler(id);
  }

  @Post('/search')
  @ApiOperation({ summary: '상품 검색', description: '상품 검색' })
  searchProducts(@Body() productInfo: SearchProductDto) {
    return this.productService.searchProductsHandler(productInfo);
  }

  @Get('/search-name/:productName')
  @ApiOperation({ summary: '상품이름 검색', description: '상품이름 검색' })
  searchProductName(@Param('productName') productName: string) {
    return this.productService.searchProductNameHandler(productName);
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
