import { ApiProperty } from "@nestjs/swagger";

export class CreateProductDto {
    @ApiProperty({description : "Price of product"})
    price: number;

    @ApiProperty({description : "Brand of product"})
    brand: String;

    @ApiProperty({description : "Image of product"})
    image: String;

    @ApiProperty({description : "Title of product"})
    title: String;

    @ApiProperty({description : "Review Score of product"})
    reviewScore: number;
}
