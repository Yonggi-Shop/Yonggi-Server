import { PartialType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Product } from 'src/product/product.entity';

export class GetProductResponseDto extends PartialType(Product) {}
