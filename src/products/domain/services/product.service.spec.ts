import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateProductDto } from '../../application/dto/create-product.dto';
import { ObjectID } from 'mongodb';
import { Product } from '../entities/product.entity';
import { Customer } from '../../../customers/domain/entities/customer.entity';
import { ProductCatalogService } from '../../../products/infrastructure/client/http/luiza-labs/product-catalog.service';
import { CustomerService } from '../../../customers/domain/services/customer.service';

const getModule = async (dynamicProviders): Promise<TestingModule> => {
  return Test.createTestingModule({
    providers: [
      CustomerService,
      ...dynamicProviders
    ],
  })
    .compile();
}

describe('Product Service', () => {
  let productService: ProductService;
  let findOne: () => {} = jest.fn();
  let find: () => {} = jest.fn();
  let findAndCount: () => {} = jest.fn();
  let createProductDto: CreateProductDto = {
    product_id: "some_id"
  }

  beforeEach(async () => {
    const module = await getModule([
      ProductService,
      {
        provide: ProductCatalogService,
        useValue: {
          getProductById: () => ({
            id: '',
            brand: '',
            title: '',
            image: '',
          }),
        }
      },
      {
        provide: getRepositoryToken(Product),
        useValue: {
          save: () => ({ ...createProductDto, customer_id: new ObjectID() }),
          findOne,
          find,
          findAndCount: () => {
            findAndCount();
            return [{}, {}];
          }
        }
      },
      {
        provide: getRepositoryToken(Customer),
        useValue: {
          findOne: () => new Customer()
        }
      }
    ])

    productService = await module.get(ProductService);
  })

  it('create method should return Product object', async () => {

    const constomer_id: string = '60cc830166b7c283fff08102';

    let customer: Product = await productService.create(constomer_id, createProductDto);

    expect(customer).toMatchObject(createProductDto);

  })

  it('findOne method should call findOne in the ProductRepository', async () => {
    const module = await getModule([
      ProductService,
      {
        provide: ProductCatalogService,
        useValue: {
          getProductById: () => ({
            id: '',
            brand: '',
            title: '',
            image: '',
          }),
        }
      },
      {
        provide: getRepositoryToken(Product),
        useValue: {
          save: () => ({ ...createProductDto, customer_id: new ObjectID() }),
          findOne: () => {
            findOne();
            return new Product();
          },
          find
        }
      },
      {
        provide: getRepositoryToken(Customer),
        useValue: {
          findOne: () => new Customer()
        }
      }
    ])

    productService = await module.get(ProductService);
    await productService.findOne('60cc830166b7c283fff08102', '60cc830166b7c283fff08102');

    expect(findOne).toBeCalled();

  })

  it('findAll method should call find in the ProductRepository', async () => {

    await productService.findAll('60cc830166b7c283fff08102', '1', '10');

    expect(findAndCount).toBeCalled();

  })
});