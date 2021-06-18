import { Entity, ObjectID, ObjectIdColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'favorite_products' })
export class Product {
    @ObjectIdColumn()
    product_id: ObjectID;

    @Column()
    product_catalog_id: string;

    @Column()
    customer_id: string;

    @Column()
    price: number;

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
