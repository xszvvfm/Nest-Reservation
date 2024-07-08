import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Show } from './entities/show.entity';
import { Schedule } from './entities/show-schedule.entity';
import { Repository } from 'typeorm';
import { CreateShowDto } from './dto/create-show.dto';
import { Category } from './types/showCategory.type';

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

  /** 공연 목록 조회 **/
  async findAll(category: Category) {
    if (category) {
      return await this.showRepository.find({
        where: { category },
        relations: ['schedules'],
      });
    } else {
      return await this.showRepository.find({
        relations: ['schedules'],
      });
    }
  }

  /** 공연 상세 조회 **/
  async findOne(id: number) {
    const show = await this.showRepository.findOne({
      where: { id },
      relations: ['schedules'],
    });

    if (!show) {
      throw new NotFoundException('공연을 찾을 수 없습니다.');
    }

    return show;
  }
}
