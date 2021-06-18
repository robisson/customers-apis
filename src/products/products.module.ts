import { Module } from '@nestjs/common';
import { ProductService } from './domain/services/product.service';
import { ProductsController } from './application/adapters/rest/products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './domain/entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
  ],
  controllers: [ProductsController],
  providers: [ProductService]
})
export class ProductsModule { }
