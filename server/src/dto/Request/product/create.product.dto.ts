import { PartialType } from '@nestjs/swagger';
import { Product } from 'src/product/product.entity';

//입력속성이 같을때 PartialType
//입력속성이 다를때 PickType
export class createProductDto extends PartialType(Product) {}
