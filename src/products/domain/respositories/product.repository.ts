import { Repository } from "typeorm";
import { Product } from "../entities/product.entity";

export class CustomerRepository extends Repository<Product>{

}