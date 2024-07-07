import { PickType } from '@nestjs/mapped-types';
import { Schedule } from '../entities/show-schedule.entity';
import { IsDateString, IsMilitaryTime, IsNotEmpty } from 'class-validator';

export class CreateScheduleDto extends PickType(Schedule, [
  'date',
  'time',
] as const) {
  @IsDateString()
  @IsNotEmpty({ message: '공연 날짜를 입력해주세요.' })
  date: Date;

  @IsMilitaryTime()
  @IsNotEmpty({ message: '공연 시간을 입력해주세요.' })
  time: number;
}
