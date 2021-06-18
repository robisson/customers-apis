import { Controller, Get, Post, Body, Put, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { CustomerService } from '../../../domain/services/customer.service';
import { CreateCustomerDto } from '../../../domain/dto/create-customer.dto';
import { UpdateCustomerDto } from '../../../domain/dto/update-customer.dto';
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
  create(@Body() createSolutionDto: CreateCustomerDto) {
    return this.customerService.create(createSolutionDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOkResponse({ type: [Customer] })
  @ApiOperation({ description: "List all customers", summary: "List all customers" })
  findAll(@Query() query: Object) {
    return this.customerService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerService.findOne({ where: { _id: id } });
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateSolutionDto: UpdateCustomerDto) {
    return this.customerService.update(+id, updateSolutionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerService.remove(+id);
  }
}
