import { Module } from '@nestjs/common';
import { EmpruntController } from './emprunt.controller';
import { EmpruntService } from './emprunt.service';

@Module({
  controllers: [EmpruntController],
  providers: [EmpruntService]
})
export class EmpruntModule {}
