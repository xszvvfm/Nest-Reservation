import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Role } from '../types/userRole.type';
import { Reservation } from 'src/reservation/entities/reservation.entity';

@Index('email', ['email'], { unique: true })
@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * 이메일
   * @example "aaaa1234@naver.com"
   */
  @Column({ type: 'varchar', unique: true, nullable: false })
  email: string;

  /**
   * 비밀번호
   * @example "1234"
   */
  @Column({ type: 'varchar', select: false, nullable: false })
  password: string;

  /**
   * 닉네임
   * @example "가나다"
   */
  @Column({ type: 'varchar', nullable: true })
  nickname: string;

  @Column({ type: 'int', default: 1000000 })
  points: number;

  @Column({ type: 'enum', enum: Role, default: Role.User })
  role: Role;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Reservation, (reservation) => reservation.user)
  reservations: Reservation[];
}
