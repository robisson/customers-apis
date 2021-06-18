import { Entity, ObjectID, ObjectIdColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'favorite_products' })
export class Product {
    @ObjectIdColumn()
    product_id: ObjectID;
    
    
    customer_id: ObjectID;

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
