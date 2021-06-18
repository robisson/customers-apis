import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateProductDto {
    @ApiProperty({description : "Price of product"})
    @IsNotEmpty()
    product_id: string;
}
