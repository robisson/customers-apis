import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductService } from '../../../domain/services/product.service';
import { Product } from '../../../domain/entities/product.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CustomerService } from '../../../../customers/domain/services/customer.service';
import { Customer } from '../../../../customers/domain/entities/customer.entity';
import { ProductCatalogService } from '../../../../products/infrastructure/client/http/luiza-labs/product-catalog.service';

describe('ProductsController', () => {
  let productsController: ProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        ProductService,
        CustomerService,
        ProductCatalogService,
        {
          provide: getRepositoryToken(Product),
          useValue: {}
        },
        {
          provide: getRepositoryToken(Customer),
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
