import { Test } from '@nestjs/testing';
import { CustomerService } from './customer.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { ObjectID } from 'mongodb';
import { Customer } from '../entities/customer.entity';

describe('Customer Service', () => {
  let customerService: CustomerService;
  let findOne: () => {} = jest.fn();
  let find: () => {} = jest.fn();
  let createCustomerDto: CreateCustomerDto = {
    big_picture: "url_image",
    customer: "customer",
    description: "desccription",
    market: "market",
    name: "name",
    project: "project",
    tags: "tags",
    team_members: "teams",
    year_month: "10/2020"
  }

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CustomerService,
        {
          provide: getRepositoryToken(Customer),
          useValue: {
            save: () => ({ ...createCustomerDto, customer_id: new ObjectID() }),
            findOne,
            find
          }
        },
        {
          provide: getRepositoryToken(Customer),
          useValue: {
            save: () => jest.fn()
          }
        }
      ],
    })
      .compile();

    customerService = await module.get(CustomerService);
  })

  it('create method should return Customer object', async () => {


    let customer: Customer = await customerService.create(createCustomerDto);

    expect(customer).toMatchObject(createCustomerDto);

  })

  it('findOne method should call findOne in the CustomerRepository', async () => {

    await customerService.findOne({});

    expect(findOne).toBeCalled();

  })
  
  it('findAll method should call find in the CustomerRepository', async () => {

    await customerService.findAll();

    expect(find).toBeCalled();

  })
});