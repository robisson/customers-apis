import { Module } from '@nestjs/common';
import { CustomerService } from './domain/services/customer.service';
import { CustomersController } from './application/adapters/rest/customers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './domain/entities/customer.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Customer]),
  ],
  controllers: [CustomersController],
  providers: [CustomerService]
})
export class CustomersModule { }
