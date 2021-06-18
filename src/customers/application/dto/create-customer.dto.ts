import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, isNotEmpty } from "class-validator";

export class CreateCustomerDto {
    @ApiProperty({description : "Name of customer"})
    @IsNotEmpty()
    name: String;

    @ApiProperty({description : "Email of customer"})
    @IsNotEmpty()
    @IsEmail()
    email: String;
}
