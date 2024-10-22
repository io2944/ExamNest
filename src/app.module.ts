import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LivresModule } from './livres/livres.module';
import { UsersModule } from './users/users.module';
import { EmpruntModule } from './emprunt/emprunt.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Users} from "./users/users.entity";
import {Livres} from "./livres/livres.entity";

@Module({
  imports: [ TypeOrmModule.forRoot({
    type : 'sqlite',
    database : 'dbeval.sqlite',
    entities : [Users, Livres],
    synchronize : true,
  }),
    LivresModule, UsersModule, EmpruntModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
