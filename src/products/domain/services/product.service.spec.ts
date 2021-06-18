import { Test } from '@nestjs/testing';
import { ProductService } from './product.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateProductDto } from '../dto/create-product.dto';
import { ObjectID } from 'mongodb';
import { Product } from '../entities/product.entity';
import { Customer } from '../../../customers/domain/entities/customer.entity';
import { ProductCatalogService } from '../../../products/infrastructure/client/http/luiza-labs/product-catalog.service';

describe('Product Service', () => {
  let productService: ProductService;
  let findOne: () => {} = jest.fn();
  let find: () => {} = jest.fn();
  let createProductDto: CreateProductDto = {
    product_id: "some_id"
  }

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ProductService,
        ProductCatalogService,
        {
          provide: getRepositoryToken(Product),
          useValue: {
            save: () => ({ ...createProductDto, customer_id: new ObjectID() }),
            findOne,
            find
          }
        },
        {
          provide: getRepositoryToken(Customer),
          useValue: {
            findOne
          }
        }
      ],
    })
      .compile();

    productService = await module.get(ProductService);
  })

  it('create method should return Product object', async () => {

    const constomer_id: string = "some_id";

    let customer: Product = await productService.create(constomer_id, createProductDto);

    expect(customer).toMatchObject(createProductDto);

  })

  it('findOne method should call findOne in the ProductRepository', async () => {

    await productService.findOne('customer_id','product_id');

    expect(findOne).toBeCalled();

  })

  it('findAll method should call find in the ProductRepository', async () => {

    await productService.findAll('customer_id','1', '10');

    expect(find).toBeCalled();

  })
});