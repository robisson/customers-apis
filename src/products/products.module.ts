import { HttpModule, Module } from '@nestjs/common';
import { ProductService } from './domain/services/product.service';
import { ProductsController } from './application/adapters/rest/products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './domain/entities/product.entity';
import { ProductCatalogService } from './infrastructure/client/http/luiza-labs/product-catalog.service';
import { Customer } from 'src/customers/domain/entities/customer.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Customer]),
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  controllers: [ProductsController],
  providers: [ProductService, ProductCatalogService]
})
export class ProductsModule { }
