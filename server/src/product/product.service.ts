import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async getProductsHandler(): Promise<Product[]> {
    try {
      const products = await this.productRepository.find();
      return products;
    } catch (e) {
      throw new UnauthorizedException('상품을 가져오는데 실패하였습니다.');
    }
  }

  async searchProductsHandler(productName): Promise<Product[]> {
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
}
