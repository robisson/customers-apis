import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductService } from '../../../domain/services/product.service';
import { Product } from '../../../domain/entities/product.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('ProductsController', () => {
  let productsController: ProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(Product),
          useValue: {}
        }
      ],
    }).compile();

    productsController = module.get<ProductsController>(ProductsController);
  });

  it('should be defined', () => {
    expect(productsController).toBeDefined();
  });
});
