import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductCatalogService } from 'src/products/infrastructure/client/http/luiza-labs/product-catalog.service';
import { ProductDto } from 'src/products/infrastructure/client/http/luiza-labs/product.dto';
import { Repository } from 'typeorm';
import { ObjectID } from 'mongodb';
import { CreateProductDto } from '../dto/create-product.dto';
import { Product } from '../entities/product.entity';
import { Customer } from 'src/customers/domain/entities/customer.entity';

@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
    private readonly productCatalogService: ProductCatalogService
  ) { }

  async productAlreadyExists(customer_id: string, product_id: string) {
    const condition = {
      where: { customer_id: new ObjectID(customer_id), product_catalog_id: product_id }
    };

    const product = await this.productRepository.findOne(condition);

    return product == undefined ? false : true;
  }

  async customerExists(customer_id) {
    const condition = { where: { _id: new ObjectID(customer_id) } };
    const customer: Customer = await this.customerRepository.findOne(condition);

    return customer ? true : false;
  }

  async create(customer_id: string, createProductDto: CreateProductDto) {
    const product_id: string = createProductDto.product_id;

    if (! await this.customerExists(customer_id)) {
      throw new HttpException("Customer not found!", HttpStatus.NOT_FOUND);
    }

    if (await this.productAlreadyExists(customer_id, product_id)) {
      throw new HttpException("This product is already on the favorites list!", HttpStatus.NOT_ACCEPTABLE);
    }

    const product = await this.productCatalogService.getProductById(createProductDto.product_id)

    const favoriteProduct = this.createProduct(customer_id, product as ProductDto)

    return this.productRepository.save(favoriteProduct);
  }

  createProduct(customer_id: string, product: ProductDto): Product {
    const favoriteProduct = new Product();
    favoriteProduct.customer_id = new ObjectID(customer_id);
    favoriteProduct.product_catalog_id = product.id;
    favoriteProduct.image = product.image;
    favoriteProduct.title = product.title;
    favoriteProduct.reviewScore = product.reviewScore;

    return favoriteProduct;
  }

  async findAll(customer_id: string) {

    if (! await this.customerExists(customer_id)) {
      throw new HttpException("Customer not found!", HttpStatus.NOT_FOUND);
    }

    const condition = {
      where: {
        customer_id: new ObjectID(customer_id),
      }
    };

    return this.productRepository.find(condition);
  }

  async findOne(customer_id: string, product_id: string) {

    if (! await this.customerExists(customer_id)) {
      throw new HttpException("Customer not found!", HttpStatus.NOT_FOUND);
    }

    const condition = {
      where: {
        customer_id: new ObjectID(customer_id),
        product_catalog_id: product_id
      }
    };

    const product: Product = await this.productRepository.findOne(condition);

    if (!product) {
      throw new HttpException("Product not found!", HttpStatus.NOT_FOUND);
    }

    return product;
  }

  remove(id: string) {
    return `This action removes a #${id} customer`;
  }
}