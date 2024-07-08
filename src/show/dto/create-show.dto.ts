import { PickType } from '@nestjs/mapped-types';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Show } from '../entities/show.entity';
import { Category } from '../types/showCategory.type';
import { CreateScheduleDto } from './create-show-schedule.dto';

export class CreateShowDto extends PickType(Show, [
  'title',
  'description',
  'category',
  'place',
  'price',
  'image',
  'seats',
] as const) {
  @IsString()
  @IsNotEmpty({ message: '공연 제목을 입력해주세요.' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: '공연 설명을 입력해주세요.' })
  description: string;

  @IsEnum(Category)
  @IsNotEmpty({ message: '공연 카테고리를 입력해주세요.' })
  category: Category;

  @IsString()
  @IsNotEmpty({ message: '공연 장소를 입력해주세요.' })
  place: string;

  @IsNumber()
  @IsNotEmpty({ message: '공연 금액을 입력해주세요.' })
  @Max(50000, { message: '공연 금액은 50000 포인트를 넘을 수 없습니다.' })
  price: number;

  @IsString()
  @IsNotEmpty({ message: '공연 이미지를 입력해주세요.' })
  image: string;

  @IsNumber()
  @IsNotEmpty({ message: '좌석 수를 입력해주세요.' })
  seats: number;

  // Dto 안에 Dto 사용
  @ValidateNested()
  @Type(() => CreateShowDto)
  schedules: CreateScheduleDto[];
}
