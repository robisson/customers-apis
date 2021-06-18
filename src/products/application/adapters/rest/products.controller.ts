import { Controller, Get, Post, Body, Param, Delete, UseGuards, Query, DefaultValuePipe } from '@nestjs/common';
import { ProductService } from '../../../domain/services/product.service';
import { CreateProductDto } from '../../dto/create-product.dto';
import { JwtAuthGuard } from '../../../../auth/guards/jwt-auth.guard';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ProductResponseDto } from '../../dto/product-response.dto';
import { ProductMapper } from '../../product-mapper';

@ApiTags("Customers")
@Controller('/customers')
export class ProductsController {
  constructor(
    private readonly customerService: ProductService,
  ) { }

  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse(
    {
      type: ProductResponseDto,
      description: "Product was added to favorite list successfull."
    }
  )
  @ApiUnauthorizedResponse()
  @ApiOkResponse({ type: ProductResponseDto })
  @ApiOperation({ description: "Add a product to favorite list of the customer", summary: "Add a product to favorite list of the customer" })
  @Post('/:customer_id/favorite-products')
  async create(
    @Param('customer_id') customer_id: string,
    @Body() createProductDto: CreateProductDto
  ) {

    const product: ProductResponseDto = ProductMapper.entityToProduct(
      await this.customerService.create(customer_id, createProductDto)
    );

    return product;
  }

  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: [ProductResponseDto] })
  @ApiOperation({ description: "List all favorite products of the customer", summary: "List all favorite products of the customer" })
  @Get('/:customer_id/favorite-products')
  async findAll(
    @Param('customer_id') customer_id: string,
    @Query('page', new DefaultValuePipe(1)) page: string,
    @Query('limit', new DefaultValuePipe(10)) limit: string,
  ) {

    const {
      data,
      total,
      page: pageLimit
    } = await this.customerService.findAll(customer_id, page, limit)

    const products: ProductResponseDto[] = ProductMapper.entityToProductBatch(data);

    return {
      data: products,
      total,
      page: pageLimit
    };
  }

  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: [ProductResponseDto] })
  @ApiOperation({ description: "Return a product", summary: "Return a product from favorite list" })
  @Get('/:customer_id/favorite-products/:product_id')
  async findOne(
    @Param('customer_id') customer_id: string,
    @Param('product_id') product_id: string
  ) {

    const product: ProductResponseDto = ProductMapper.entityToProduct(
      await this.customerService.findOne(customer_id, product_id)
    );

    return product;
  }

  @Delete('/:customer_id/favorite-products/:product_id')
  @ApiOkResponse()
  @ApiOperation({ description: "Delete a product", summary: "Delete a product from favorite list" })
  remove(
    @Param('customer_id') customer_id: string,
    @Param('product_id') product_id: string
  ) {
    return this.customerService.remove(customer_id, product_id);
  }
}
