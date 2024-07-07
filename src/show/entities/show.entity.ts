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
import { Reservation } from 'src/reservation/entities/reservation.entity';

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
  image: string;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'time' })
  time: number;

  @Column()
  seats: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Reservation, (reservation) => reservation.show)
  reservations: Reservation[];
}
