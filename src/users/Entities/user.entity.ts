import { Entity, ObjectID, ObjectIdColumn, Column, Index } from "typeorm";

@Entity({ name: 'users' })

export class User {

    @ObjectIdColumn()
    id: ObjectID;

    @Column({ nullable: true })
    name: String;

    @Column({ nullable: true })
    lastname: String;

    @Column({ unique: true })
    @Index({ unique: true })
    email: String;

    @Column()
    firstAccess: boolean;

    @Column()
    password: String;
}