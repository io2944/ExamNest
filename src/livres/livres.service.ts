import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Livres} from "./livres.entity";
import {Repository} from "typeorm";

@Injectable()
export class LivresService {
    constructor(@InjectRepository(Livres) private livresRepository: Repository<Livres>) {}

    createLivre(titre: string, auteur: string, genre: string, rating: number) {
        const livre = this.livresRepository.create(
            {
                titre: titre,
                auteur: auteur,
                genre: genre,
                rating: rating
            }
        )
        this.livresRepository.save(livre)
    }
}
