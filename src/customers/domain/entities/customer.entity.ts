import { Entity, ObjectID, ObjectIdColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: 'customers' })
export class Customer {
    @ObjectIdColumn()
    customer_id: ObjectID;

    @Column()
    name: String;

    @Column({ unique: true })
    email: String;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
