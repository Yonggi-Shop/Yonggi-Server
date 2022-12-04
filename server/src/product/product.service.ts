import {
  ForbiddenException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateNoticeProductDto } from 'src/dto/Request/product/create.notice.product.dto';
import { createProductDto } from 'src/dto/Request/product/create.product.dto';
import {
  SearchProductDto,
  SearchProductNameDto,
} from 'src/dto/Request/product/search.product.dto';
import { GetProductResponseDto } from 'src/dto/Response/get.product.response.dto';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getProductsHandler(
    start: number,
    limit: number,
  ): Promise<[Product[], number]> {
    try {
      const products = await this.productRepository
        .createQueryBuilder('product')
        .limit(limit)
        .offset(start)
        .getManyAndCount();
      return products;
    } catch (e) {
      throw new UnauthorizedException('상품을 가져오는데 실패하였습니다.');
    }
  }

  async findProductHandler(id: number): Promise<Product> {
    try {
      const products = await this.productRepository.findOneBy({ id });
      if (!products) {
        new UnauthorizedException('존재하지 않는 상품입니다.');
      }
      return products;
    } catch (e) {
      throw new UnauthorizedException('상품을 가져오는데 실패하였습니다.');
    }
  }

  async searchProductsHandler(
    productInfo: SearchProductDto,
  ): Promise<GetProductResponseDto[]> {
    try {
      const { productName, userId } = productInfo;
      const searchProducts = await this.productRepository
        .createQueryBuilder()
        .where('productName like :productName', {
          productName: `%${productName}%`,
        })
        .getMany();
      if (!searchProducts) {
        throw new UnauthorizedException('존재하지 않는 상품입니다.');
      }
      if (userId) {
        const searchRecent = await this.userRepository
          .createQueryBuilder()
          .select(['recentSearch'])
          .where('userId = :userId', { userId })
          .execute();
        const { recentSearch } = searchRecent[0];
        const addRecentArr = recentSearch.concat(productName);
        if (addRecentArr.length > 10) {
          addRecentArr.pop();
        }
        await this.userRepository
          .createQueryBuilder()
          .update(User)
          .set({ recentSearch: addRecentArr })
          .where('userId = :userId', { userId })
          .execute();
      }
      return searchProducts;
    } catch (e) {
      throw new UnauthorizedException(e);
    }
  }

  async searchProductNameHandler(productName: string): Promise<string[]> {
    try {
      const names = await this.productRepository
        .createQueryBuilder()
        .where('productName like :productName', {
          productName: `%${productName}%`,
        })
        .orderBy('productName', 'ASC')
        .getMany();
      let resultNames: Product[] | string | string[] = names;
      resultNames = resultNames.map((v) => v.productName);
      return resultNames;
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

  async createNoticeProductHandler(noticeProduct: CreateNoticeProductDto) {
    try {
      return this.productRepository.save(noticeProduct);
    } catch (e) {
      throw new UnauthorizedException(e);
    }
  }

  async getNoticeProductsHandler(): Promise<Product[]> {
    try {
      return this.productRepository.find();
    } catch (e) {
      throw new UnauthorizedException(e);
    }
  }
}
