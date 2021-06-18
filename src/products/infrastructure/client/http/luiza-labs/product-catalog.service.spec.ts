import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import axios from 'axios';
import { ProductCatalogService } from './product-catalog.service';

describe('ProductCatalogService', () => {
  let service: ProductCatalogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductCatalogService],
    }).compile();

    service = module.get<ProductCatalogService>(ProductCatalogService);
  });

  it('getProductById should to call a remote api', async () => {
    const products = [{
      id: 'product_id'
    }];

    const result = {
      data: products,
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {}
    };

    jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve(result));
    let resultData = await service.getProductById('product_id');

    expect(products).toMatchObject(resultData);
  });
});
