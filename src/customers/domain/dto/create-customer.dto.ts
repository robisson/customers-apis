import { ApiProperty } from "@nestjs/swagger";

export class CreateCustomerDto {
    @ApiProperty({description : "Name of customer"})
    name: String;

    @ApiProperty({description : "Email of customer"})
    email: String;
}
