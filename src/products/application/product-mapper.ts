import { Product } from "../domain/entities/product.entity";
import { ProductResponseDto } from "./dto/product-response.dto";

export class ProductMapper {
  public static entityToProduct(product: Product): ProductResponseDto {
    const productDto: ProductResponseDto = {
      id: product.product_catalog_id,
      title: product.title,
      price: product.price,
      image: product.image,
      reviewScore: product.reviewScore
    }

    return productDto
  }

  public static entityToProductBatch(products: Product[]): ProductResponseDto[] {
    return products
      .map((product: Product) => ProductMapper.entityToProduct(product))
  }
}