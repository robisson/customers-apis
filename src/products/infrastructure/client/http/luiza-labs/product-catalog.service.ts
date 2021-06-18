import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import axios from "axios";

@Injectable()
export class ProductCatalogService {
  private productApiUrl = process.env.PRODUCT_API;

  async getProductById(product_id: string) {
    try {
      const product_url = `${this.productApiUrl}/${product_id}/`;
      const { data } = await axios.get(product_url);

      return data;
    } catch (exception) {
      const { response: { status } } = exception;

      if (status == HttpStatus.NOT_FOUND) {
        throw new HttpException("Product not found in product catalog!", HttpStatus.NOT_FOUND);
      }
    }

  }
}