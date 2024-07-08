import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Show } from './entities/show.entity';
import { ShowController } from './show.controller';
import { ShowService } from './show.service';
import { Schedule } from './entities/show-schedule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Show, Schedule])],
  providers: [ShowService],
  controllers: [ShowController],
})
export class ShowModule {}
