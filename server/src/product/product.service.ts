import { Injectable, Logger } from '@nestjs/common';
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
      //상품리스트 가져오는 로직작성필요
      const products = await this.productRepository.find();
      return products;
    } catch (e) {
      console.log(e);
    }
  }
}
