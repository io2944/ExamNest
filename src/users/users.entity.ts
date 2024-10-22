import { AfterInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Users {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    email: string

    @Column()
    password: string

    @AfterInsert()
    logInsert() {
        console.log('User created with id ' + this.id)
    }
}