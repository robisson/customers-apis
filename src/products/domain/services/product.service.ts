import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(Product)
    private userRepository: Repository<Product>,
  ) { }

  async create(createProductDto: CreateProductDto) {
    const customer: Product = await this.userRepository.save(createProductDto);

    return customer;
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(where: object) {
    return this.userRepository.findOne(where);
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} customer`;
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}