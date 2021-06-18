import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObjectID } from 'mongodb';
import { CreateCustomerDto } from '../../application/dto/create-customer.dto';
import { UpdateCustomerDto } from '../../application/dto/update-customer.dto';
import { Customer } from '../entities/customer.entity';

@Injectable()
export class CustomerService {

  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) { }

  async create(createCustomerDto: CreateCustomerDto) {
    const CustomerAlreadyExisits: Customer = await this.customerRepository.findOne({ where: { email: createCustomerDto.email } });

    if (CustomerAlreadyExisits) {
      throw new HttpException("Customer already exists!", HttpStatus.NOT_ACCEPTABLE);
    }

    const customer: Customer = await this.customerRepository.save(createCustomerDto);

    return customer;
  }

  findAll() {
    return this.customerRepository.find();
  }

  async findOne(customer_id: string) {

    const mongoId = new ObjectID(customer_id);

    const customer: Customer = await this.customerRepository.findOne({ where: { _id: mongoId } });

    if (!customer) {
      throw new HttpException("Customer Not Found!", HttpStatus.NOT_FOUND);
    }

    return customer
  }

  async update(customer_id: string, updateCustomerDto: UpdateCustomerDto) {
    const mongoId = new ObjectID(customer_id);

    const customer: Customer = await this.customerRepository.findOne({ where: { _id: mongoId } });

    if (!customer) {
      throw new HttpException("Customer Not Found!", HttpStatus.NOT_FOUND);
    }

    customer.email = updateCustomerDto.email;
    customer.name = updateCustomerDto.name;

    await this.customerRepository.update(mongoId, customer);

    return customer;
  }

  async remove(customer_id: String) {
    const mongoId = new ObjectID(customer_id);
    const customer: Customer = await this.customerRepository.findOne({ where: { _id: mongoId } });

    if (!customer) {
      throw new HttpException("Customer Not Found!", HttpStatus.NOT_FOUND);
    }

    return this.customerRepository.remove(customer);
  }
}