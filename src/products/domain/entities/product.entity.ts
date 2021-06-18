import { Entity, ObjectID, ObjectIdColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
/**
 * price: preço do produto
image: URL da imagem do produto
brand: marca do produto
id: id do produto
title: nome do produto
reviewScore: média dos reviews para este produto
 */
@Entity({ name: 'customers' })
export class Product {
    @ObjectIdColumn()
    customer_id: ObjectID;

    @Column()
    price: number;
    
    @Column()
    brand: String;

    @Column()
    image: String;

    @Column()
    title: String;

    @Column()
    reviewScore: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
