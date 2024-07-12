import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Category } from '../types/showCategory.type';
import { Schedule } from './show-schedule.entity';

@Index('title', ['title'], { unique: true })
@Entity({
  name: 'shows',
})
export class Show {
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * 공연명
   * @example "뮤지컬 <시카고>"
   */
  @Column({ type: 'varchar', unique: true, nullable: false })
  title: string;

  /**
   * 공연 설명
   * @example "24년간 대한민국 뮤지컬 정상을 지켜온 뮤지컬 시카고"
   */
  @Column({ type: 'text' })
  description: string;

  /**
   * 공연 카테고리
   * @example "Musical"
   */
  @Column({ type: 'enum', enum: Category })
  category: Category;

  /**
   * 공연 장소
   * @example "블루스퀘어 신한카드홀"
   */
  @Column()
  place: string;

  /**
   * 공연 가격
   * @example "50000"
   */
  @Column()
  price: number;

  /**
   * 공연 이미지
   * @example "https://tickets.interpark.com/contents/_next/image?url=http%3A%2F%2Fticketimage.interpark.com%2FTCMS3.0%2F%2FMProd%2FProdBridge%2F2407%2F8f3f44dd-4f4c-4c37-9bfe-ad648807d8d6.jpg&w=1920&q=75"
   */
  @Column()
  image: string;

  /**
   * 공연 좌석 수
   * @example "100"
   */
  @Column()
  seats: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Schedule, (schedule) => schedule.show)
  schedules: Schedule[];
}
