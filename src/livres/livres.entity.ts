import {Entity, PrimaryGeneratedColumn, Column, AfterInsert} from 'typeorm';

@Entity()
export class Livres {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    titre: string

    @Column()
    auteur: string;

    @Column()
    genre: string;

    @Column()
    rating: number;

    @AfterInsert()
    logInsert() {
        console.log('Livre created with id ' + this.id)
    }
}