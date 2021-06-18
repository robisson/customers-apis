import { Controller, Get, Post, Body, Put, Param, Delete, Query, UseGuards, HttpException, HttpStatus, Patch } from '@nestjs/common';
import { CustomerService } from '../../../domain/services/customer.service';
import { CreateCustomerDto } from '../../dto/create-customer.dto';
import { UpdateCustomerDto } from '../../dto/update-customer.dto';
import { JwtAuthGuard } from '../../../../auth/guards/jwt-auth.guard';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Customer } from '../../../domain/entities/customer.entity';

@ApiTags("Customers")
@Controller('customers')
export class CustomersController {
  constructor(private readonly customerService: CustomerService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiCreatedResponse(
    {
      type: CreateCustomerDto,
      description: "Customer was created successfull."
    }
  )
  @ApiUnauthorizedResponse()
  @ApiOperation({ description: "Create a customer", summary: "Create a customer" })
  create(@Body() createSolutionDto: CreateCustomerDto) {
    return this.customerService.create(createSolutionDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOkResponse({ type: [Customer] })
  @ApiOperation({ description: "List all customers", summary: "List all customers" })
  findAll() {
    return this.customerService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':customer_id')
  findOne(@Param('customer_id') customer_id: string) {

    if (customer_id.length !== 24) {
      throw new HttpException("The customer_id must be a tring of 24 characteres", HttpStatus.NOT_ACCEPTABLE);
    }

    return this.customerService.findOne(customer_id);
  }

  @Put(':customer_id')
  update(@Param('customer_id') customer_id: string, @Body() updateSolutionDto: CreateCustomerDto) {

    if (customer_id.length !== 24) {
      throw new HttpException("The customer_id must be a tring of 24 characteres", HttpStatus.NOT_ACCEPTABLE);
    }

    return this.customerService.update(customer_id, updateSolutionDto);
  }

  @Patch(':customer_id')
  partialUpdate(@Param('customer_id') customer_id: string, @Body() updateSolutionDto: UpdateCustomerDto) {

    if (customer_id.length !== 24) {
      throw new HttpException("The customer_id must be a tring of 24 characteres", HttpStatus.NOT_ACCEPTABLE);
    }

    return this.customerService.update(customer_id, updateSolutionDto);
  }

  @Delete(':customer_id')
  async remove(@Param('customer_id') customer_id: string) {
    if (customer_id.length !== 24) {
      throw new HttpException("The customer_id must be a tring of 24 characteres", HttpStatus.NOT_ACCEPTABLE);
    }

    await this.customerService.remove(customer_id);

    return;
  }
}