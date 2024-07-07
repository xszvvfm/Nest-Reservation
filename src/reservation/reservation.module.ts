import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from 'src/user/entities/user.entity';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';

import { Reservation } from './entities/reservation.entity';
import { Show } from 'src/show/entities/show.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation, User, Show])],
  providers: [ReservationService],
  controllers: [ReservationController],
})
export class ReservationModule {}
