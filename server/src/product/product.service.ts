import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: Repository<Product>) {}

  async getProducts() {
    try {
      //상품리스트 가져오는 로직작성필요
    } catch (e) {
      console.log(e);
    }
  }
}
