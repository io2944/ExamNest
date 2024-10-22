import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { UsersService } from './users.service';
import {randomBytes, scrypt as _scrypt} from 'crypto';
import {promisify} from "util";

const scrypt = promisify(_scrypt)

@Injectable()
export class AuthService {

    constructor(private userService: UsersService) {
    }

    async signup(email: string, password: string) {
        const user = await this.userService.findOneByEmail(email)

        if (user) {
            throw new BadRequestException('Email in use')
        }
        const salt = randomBytes(8).toString('hex');
        const hash = (await scrypt(password, salt, 32)) as Buffer
        const result = salt + '.' + hash.toString('hex')
        return  this.userService.createUser(email, result)
    }

    async signin(email: string, password: string) {
        const user = await this.userService.findOneByEmail(email)
        if (!user) {
            throw new NotFoundException(`Wrong email or password`);
        }
        else {

            const [salt, storedHash] = user.password.split('.')
            //const salt = result[0];
            //const storedHash = result[1];
            const hash = (await scrypt(password, salt, 32)) as Buffer

            if (hash.toString('hex') !== storedHash) {
                throw new BadRequestException(`Wrong email or password`)
            } else {
                console.log('sign in successfully')
                return user
            }
        }
    }
}