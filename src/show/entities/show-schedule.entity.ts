import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Show } from './show.entity';
import { Reservation } from 'src/reservation/entities/reservation.entity';

@Entity({
  name: 'schedules',
})
export class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  showId: number;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'time' })
  time: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Show, (show) => show.schedules)
  show: Show;

  @OneToMany(() => Reservation, (reservation) => reservation.schedule)
  reservation: Reservation;
}
