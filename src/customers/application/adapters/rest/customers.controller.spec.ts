import { Test, TestingModule } from '@nestjs/testing';
import { CustomersController } from './customers.controller';
import { CustomerService } from '../../../domain/services/customer.service';
import { CreateCustomerDto } from '../../dto/create-customer.dto';

describe('CustomersController', () => {
  let customersController: CustomersController;
  const create = jest.fn();
  const findAll = jest.fn();
  const findOne = jest.fn();
  const update = jest.fn();
  const customer_id = '60cc830166b7c283fff08102';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomersController],
      providers: [
        {
          provide: CustomerService,
          useValue: {
            create,
            findAll,
            findOne,
            update
          }
        }
      ],
    }).compile();

    customersController = module.get<CustomersController>(CustomersController);
  });

  it('Call create method should to call service create', () => {

    customersController.create(new CreateCustomerDto());

    expect(create).toBeCalledTimes(1);
  });

  it('Call findAll method should to call service create', () => {

    customersController.findAll();

    expect(findAll).toBeCalledTimes(1);
  });
  it('Call findOne method should to call service create', () => {

    customersController.findOne(customer_id);

    expect(findOne).toBeCalledTimes(1);
  });
  it('Call update method should to call service create', () => {

    customersController.update(customer_id, new CreateCustomerDto());

    expect(update).toBeCalledTimes(1);
  });
});
