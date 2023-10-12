import {
  Entity,
  Column,
  OneToMany,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TeachingClass } from '../../teaching-class/entities/teaching-class.entity';

@Entity({
  name: 'teacher',
})
export class Teacher extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  age: number;

  @Column({ nullable: false, unique: true })
  mobileNumber: string;

  @Column({ default: false })
  verified: boolean;

  @OneToMany(() => TeachingClass, (teachingClass) => teachingClass.teacher)
  teachingClasses: TeachingClass[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
