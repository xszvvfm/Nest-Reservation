import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Show } from './entities/show.entity';
import { ShowController } from './show.controller';
import { ShowService } from './show.service';

import { Reservation } from 'src/reservation/entities/reservation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Show, Reservation])],
  providers: [ShowService],
  controllers: [ShowController],
})
export class ShowModule {}
