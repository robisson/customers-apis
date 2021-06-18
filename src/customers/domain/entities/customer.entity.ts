import { Entity, ObjectID, ObjectIdColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from "typeorm";

@Entity({ name: 'customers' })
export class Customer {
    @ObjectIdColumn()
    customer_id: ObjectID;

    @Column()
    name: String;

    @Column({ unique: true })
    @Index({ unique: true })
    email: String;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
