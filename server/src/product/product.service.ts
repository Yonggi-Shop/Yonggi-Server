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

  async getProducts() {
    try {
      const products = await this.productRepository.find();
      return products;
    } catch (e) {
      throw new UnauthorizedException('상품을 가져오는데 실패하였습니다.');
    }
  }
}
