import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateNoticeProductDto } from 'src/dto/Request/product/create.notice.product.dto';
import { createProductDto } from 'src/dto/Request/product/create.product.dto';
import { GetProductResponseDto } from 'src/dto/Response/get.product.response.dto';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  //type any부분 고쳐야함
  async getProductsHandler(start: number, limit: number): Promise<any> {
    try {
      const products = await this.productRepository
        .createQueryBuilder('product')
        .select()
        .from(Product, 'product')
        .limit(limit)
        .offset(start)
        .getManyAndCount();
      return products;
    } catch (e) {
      throw new UnauthorizedException('상품을 가져오는데 실패하였습니다.');
    }
  }

  async searchProductsHandler(productName): Promise<GetProductResponseDto[]> {
    try {
      const searchProducts = await this.productRepository
        .createQueryBuilder('product')
        .where('product.productName like :productName', {
          productName: `${productName}`,
        })
        .getMany();
      if (!searchProducts) {
        throw new UnauthorizedException('존재하지 않는 상품입니다.');
      }
      return searchProducts;
    } catch (e) {
      throw new UnauthorizedException(e);
    }
  }

  async createProductHandler(product: createProductDto): Promise<any> {
    try {
      const findProduct = this.productRepository.findOneBy({
        productName: product.productName,
      });
      if (findProduct) {
        throw new UnauthorizedException('이미 존재하는 상품명 입니다.');
      } else return this.productRepository.save(product);
    } catch (e) {
      throw new UnauthorizedException(e);
    }
  }

  //noticeProduct로 분리해야함 스키마 추가 필요
  async createNoticeProductHandler(noticeProduct: CreateNoticeProductDto) {
    try {
      return this.productRepository.save(noticeProduct);
    } catch (e) {
      throw new UnauthorizedException(e);
    }
  }

  //noticeProduct로 분리해야함
  async getNoticeProductsHandler(): Promise<Product[]> {
    try {
      return this.productRepository.find();
    } catch (e) {
      throw new UnauthorizedException(e);
    }
  }
}
