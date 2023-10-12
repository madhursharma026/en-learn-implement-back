import {
  Column,
  Entity,
  OneToMany,
  ManyToMany,
  DeepPartial,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Conversation } from '../../conversation/entities/conversation.entity';
import { TeachingClass } from '../../teaching-class/entities/teaching-class.entity';

@Entity({
  name: 'users',
})
export class User {
  constructor(userLikeObject: DeepPartial<User>) {
    return Object.assign(this, userLikeObject);
  }

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

  @Column({ nullable: true, default: 0 })
  level: number;

  @Column({ default: 0 })
  totalTalks: number;

  @ManyToMany(() => TeachingClass, (teachingClass) => teachingClass.usersJoined)
  teachingClasses: TeachingClass[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(
    () => Conversation,
    (conversation) => conversation.conversationInitiator,
  )
  conversationsStarted: Conversation[];

  @OneToMany(
    () => Conversation,
    (conversation) => conversation.conversationWith,
  )
  conversationJoined: Conversation[];
}
