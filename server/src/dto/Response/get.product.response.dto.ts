import { Exclude } from 'class-transformer';
import { Product } from 'src/product/product.entity';

export class GetProductResponseDto {
  static toDto(product: Product) {
    //상품dto필요
  }
}
