import { Controller, Get, Post, Body, Put, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ProductService } from '../../../domain/services/product.service';
import { CreateProductDto } from '../../../domain/dto/create-product.dto';
import { UpdateProductDto } from '../../../domain/dto/update-product.dto';
import { JwtAuthGuard } from '../../../../auth/guards/jwt-auth.guard';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Product } from '../../../domain/entities/product.entity';

@ApiTags("Customers")
@Controller('/customers/:customer_id/favorite-products')
export class ProductsController {
  constructor(private readonly customerService: ProductService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiCreatedResponse(
    {
      type: CreateProductDto,
      description: "Solution was created successfull."
    }
  )
  @ApiUnauthorizedResponse()
  create(@Body() createSolutionDto: CreateProductDto) {
    return this.customerService.create(createSolutionDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOkResponse({ type: [Product] })
  @ApiOperation({ description: "List all customers", summary: "List all customers" })
  findAll(@Query() query: Object) {
    return this.customerService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerService.findOne({ where: { _id: id } });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerService.remove(+id);
  }
}
