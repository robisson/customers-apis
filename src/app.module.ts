import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/Entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { CustomersModule } from './customers/customers.module';
import { Customer } from './customers/domain/entities/customer.entity';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health/health.controller';
import { ProductsModule } from './products/products.module';
import { Product } from './products/domain/entities/product.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: process.env.DRIVER_DB as any,
      host: process.env.HOST_DB,
      port: process.env.PORT_DB as any,
      database: process.env.DATABASE,
      entities: [User, Customer, Product],
      logging: true,
      useUnifiedTopology: true
    }),
    UsersModule,
    AuthModule,
    CustomersModule,
    TerminusModule,
    ProductsModule
  ],
  controllers: [HealthController],
  providers: [],
})
export class AppModule { }
