import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObjectID } from 'mongodb';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { UpdateCustomerDto } from '../dto/update-customer.dto';
import { Customer } from '../entities/customer.entity';

@Injectable()
export class CustomerService {

  constructor(
    @InjectRepository(Customer)
    private userRepository: Repository<Customer>,
  ) { }

  async create(createCustomerDto: CreateCustomerDto) {
    const CustomerAlreadyExisits: Customer = await this.userRepository.findOne({ where: { email: createCustomerDto.email } });

    if (CustomerAlreadyExisits) {
      throw new HttpException("Customer already exists!", HttpStatus.NOT_ACCEPTABLE);
    }

    const customer: Customer = await this.userRepository.save(createCustomerDto);

    return customer;
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(customer_id: string) {

    const mongoId = new ObjectID(customer_id);

    const customer: Customer = await this.userRepository.findOne({ where: { _id: mongoId } });

    if (!customer) {
      throw new HttpException("Customer Not Found!", HttpStatus.NOT_FOUND);
    }

    return customer
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return `This action updates a #${id} customer`;
  }

  async remove(customer_id: String) {
    const mongoId = new ObjectID(customer_id);
    const customer: Customer = await this.userRepository.findOne({ where: { _id: mongoId } });

    if (!customer) {
      throw new HttpException("Customer Not Found!", HttpStatus.NOT_FOUND);
    }

    return this.userRepository.remove(customer);
  }
}