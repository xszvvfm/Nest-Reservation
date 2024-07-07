import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Show } from './entities/show.entity';
import { Schedule } from './entities/show-schedule.entity';
import { Repository } from 'typeorm';
import { CreateShowDto } from './dto/create-show.dto';

@Injectable()
export class ShowService {
  constructor(
    @InjectRepository(Show)
    private showRepository: Repository<Show>,
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
  ) {}

  /** 공연 등록 **/
  async create(createShowDto: CreateShowDto) {
    const { schedules, ...showData } = createShowDto;

    const newShow = await this.showRepository.save({
      schedules: schedules?.map((schedule) => ({
        ...schedule,
      })),
      ...showData,
    });

    return newShow;
  }
}
