import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { ProductService } from '../../../domain/services/product.service';
import { CreateProductDto } from '../../../domain/dto/create-product.dto';
import { JwtAuthGuard } from '../../../../auth/guards/jwt-auth.guard';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Product } from '../../../domain/entities/product.entity';

@ApiTags("Customers")
@Controller('/customers')
export class ProductsController {
  constructor(
    private readonly customerService: ProductService,
  ) { }

  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse(
    {
      type: CreateProductDto,
      description: "Product was added to favorite list successfull."
    }
  )
  @ApiUnauthorizedResponse()
  @Post('/:customer_id/favorite-products')
  async create(
    @Param('customer_id') customer_id: string,
    @Body() createProductDto: CreateProductDto
  ) {
    return this.customerService.create(customer_id, createProductDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: [Product] })
  @ApiOperation({ description: "List all customers", summary: "List all customers" })
  @Get('/:customer_id/favorite-products')
  findAll(@Param('customer_id') customer_id: string) {
    return this.customerService.findAll(customer_id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:customer_id/favorite-products/:product_id')
  findOne(
    @Param('customer_id') customer_id: string,
    @Param('product_id') product_id: string
  ) {
    return this.customerService.findOne(customer_id, product_id);
  }

  @Delete('/:customer_id/favorite-products/:product_id')
  remove(
    @Param('customer_id') customer_id: string,
    @Param('product_id') product_id: string
  ) {
    return this.customerService.remove(customer_id, product_id);
  }
}
