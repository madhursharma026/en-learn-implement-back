import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from '../../users/entities/user.entity';

@Entity()
export class Conversation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.conversationsStarted)
  @JoinColumn({ name: 'conversation_initiator_id' })
  conversationInitiator: User;

  @Column({ nullable: true, name: 'conversation_initiator_id' })
  conversationInitiatorId: number;

  @ManyToOne(() => User, (user) => user.conversationJoined)
  @JoinColumn({ name: 'conversation_with_id' })
  conversationWith: User;

  @Column({ nullable: true, name: 'conversation_with_id' })
  conversationWithId: number;

  @Column({ type: 'bool', default: true })
  isWaiting = true;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
