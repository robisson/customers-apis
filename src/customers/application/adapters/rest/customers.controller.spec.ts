import { Test, TestingModule } from '@nestjs/testing';
import { CustomersController } from './customers.controller';
import { CustomerService } from '../../../domain/services/customer.service';
import { Customer } from '../../../domain/entities/customer.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('CustomersController', () => {
  let customersController: CustomersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomersController],
      providers: [
        CustomerService,
        {
          provide: getRepositoryToken(Customer),
          useValue: {}
        }
      ],
    }).compile();

    customersController = module.get<CustomersController>(CustomersController);
  });

  it('should be defined', () => {
    expect(customersController).toBeDefined();
  });
});
