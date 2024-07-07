import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from 'src/user/entities/user.entity';
import { Schedule } from 'src/show/entities/show-schedule.entity';

@Entity({
  name: 'reservations',
})
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  scheduleId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.reservations)
  user: User;

  @ManyToOne(() => Schedule, (schedule) => schedule.reservation)
  schedule: Schedule;
}
