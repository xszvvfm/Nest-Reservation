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

  @Column({ type: 'varchar', unique: true, nullable: false })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'enum', enum: Category })
  category: Category;

  @Column()
  place: string;

  @Column()
  price: number;

  @Column()
  image: string;

  @Column()
  seats: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Schedule, (schedule) => schedule.show)
  schedules: Schedule[];
}
