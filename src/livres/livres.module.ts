import { Module } from '@nestjs/common';
import { LivresController } from './livres.controller';
import { LivresService } from './livres.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Livres} from "./livres.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Livres])],
  controllers: [LivresController],
  providers: [LivresService]
})
export class LivresModule {}
