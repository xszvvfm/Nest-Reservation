import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from 'src/user/entities/user.entity';
import { Reservation } from './entities/reservation.entity';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';
import { Schedule } from 'src/show/entities/show-schedule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation, User, Schedule])],
  providers: [ReservationService],
  controllers: [ReservationController],
})
export class ReservationModule {}
