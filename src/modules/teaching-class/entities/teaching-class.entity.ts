import {
  Entity,
  Column,
  JoinTable,
  ManyToOne,
  ManyToMany,
  BaseEntity,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from '../../users/entities/user.entity';
import { Teacher } from '../../teachers/entities/teacher.entity';

@Entity({ name: 'teaching_class' })
export class TeachingClass extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column({ type: 'datetime', nullable: false })
  startsAt: Date;

  @Column({ type: 'varchar', nullable: true, default: '' })
  description?: string;

  @ManyToMany(() => User, (user) => user.teachingClasses)
  @JoinTable({ name: 'teaching_class_joined_users' })
  usersJoined: User[];

  @Column({ name: 'teacher_id', nullable: false })
  teacherId: number;

  @ManyToOne(() => Teacher, (teacher) => teacher.teachingClasses)
  @JoinColumn({ name: 'teacher_id' })
  teacher: Teacher;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
