import { Test } from '@nestjs/testing';
import { ProductService } from './product.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateProductDto } from '../dto/create-product.dto';
import { ObjectID } from 'mongodb';
import { Product } from '../entities/product.entity';

describe('Product Service', () => {
  let productService: ProductService;
  let findOne: () => {} = jest.fn();
  let find: () => {} = jest.fn();
  let createProductDto: CreateProductDto = {
    price: 100,
    brand: "teste",
    image: "teste",
    title: "teste",
    reviewScore: 0,
  }

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(Product),
          useValue: {
            save: () => ({ ...createProductDto, customer_id: new ObjectID() }),
            findOne,
            find
          }
        }
      ],
    })
      .compile();

    productService = await module.get(ProductService);
  })

  it('create method should return Product object', async () => {


    let customer: Product = await productService.create(createProductDto);

    expect(customer).toMatchObject(createProductDto);

  })

  it('findOne method should call findOne in the ProductRepository', async () => {

    await productService.findOne({});

    expect(findOne).toBeCalled();

  })

  it('findAll method should call find in the ProductRepository', async () => {

    await productService.findAll();

    expect(find).toBeCalled();

  })
});