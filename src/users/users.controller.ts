import {
    Body,
    Controller,
    Param,
    Post,
    Get,
    Patch,
    Delete,
    NotFoundException,
    Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from '../dto/users/users.dto';
import { UpdateUserDto } from '../dto/users/users.update.dto';

import { AuthService } from './users.service.auth';

@Controller('auth')
export class UsersController {

    constructor(private userService: UsersService,
                private authService: AuthService,) {}

    @Post('/signup')
    createUser(@Body() body:CreateUserDto) {

        return this.authService.signup(body.email, body.password);
    }

    @Get('/:id')

    findById(@Param('id') id: number) {
        const user = this.userService.findOne(id);
        return user;

    }

    @Patch('/:id')
    updateUser(@Param('id') id: string, @Body() body:UpdateUserDto) {
        return this.userService.update(parseInt(id), body);
    }

    @Delete('/:id')
    async deleteUser(@Param('id') id: number) {
        return await this.userService.remove(id)
    }

    @Get()
    async findByEmail(@Query('email') email: string) {
        const user = await this.userService.findOneByEmail(email);
        if (!user) {
            throw new NotFoundException(`User with email ${email} not found.`);
        }
        return user;
    }

    @Post('/signin')
    async login(@Body() body : CreateUserDto) {
        return await this.authService.signin(body.email,body.password)
    }
}
