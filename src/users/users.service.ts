import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Users} from "./users.entity";
import {Repository} from "typeorm";

@Injectable()
export class UsersService {
    constructor(@InjectRepository(Users) private repo: Repository<Users>) {}

    createUser(email: string, password: string) {
        const user = this.repo.create(
            {
                email: email,
                password: password
            }
        )
        this.repo.save(user)
    }

    findOne(id: number) {
        const user = this.repo.findOneBy({ id })
        return user
    }

    async update(id: number, attr:Partial<Users>) {
        const user=await this.findOne(id)
        if (!user) throw new Error('User not found')
        Object.assign(user, attr)
        return this.repo.save(user)
    }

    async remove(id: number) {
        const user = await this.findOne(id)
        if (!user) throw new Error('User #${id} not found')
        await this.repo.remove(user)
        return `User #${id} removed`
    }

    async findOneByEmail(email: string) {
        return await this.repo.findOneBy({ email });
    }
}
