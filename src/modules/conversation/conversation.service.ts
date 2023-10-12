import { Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Inject, forwardRef } from '@nestjs/common';

import { UsersService } from '../users/users.service';
import { Conversation } from './entities/conversation.entity';
import { ICurrentUser } from '../auth/interfaces/current-user.interface';

@Injectable()
export class ConversationService {
  constructor(
    @InjectRepository(Conversation)
    private readonly conversationRepository: Repository<Conversation>,
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
  ) {}

  async createOrJoinConversation(currentUser: ICurrentUser) {
    const user = await this.userService.findOne({
      where: { id: currentUser.id },
    });

    const waitingConversation = await this.conversationRepository.findOne({
      where: { isWaiting: true, conversationInitiator: Not(user.id) },
      loadRelationIds: true,
    });

    let conversation: Conversation;

    if (!waitingConversation) {
      conversation = this.conversationRepository.create({
        conversationInitiator: user,
        conversationWith: null,
      });

      conversation = await this.conversationRepository.save(conversation);

      return {
        ...conversation,
        conversationInitiator: conversation.conversationInitiator.id,
        isPair: false,
      };
    } else {
      conversation = await this.conversationRepository.save({
        ...waitingConversation,
        conversationWith: user,
        isWaiting: false,
      });
      return {
        ...conversation,
        conversationWith: user.id,
        isPair: true,
      };
    }
  }

  async getConversationStartedByUser(userId: number) {
    return this.conversationRepository.findBy({
      conversationInitiatorId: userId,
    });
  }

  async getConversationJoinedByUser(userId: number) {
    return this.conversationRepository.findBy({
      conversationWithId: userId,
    });
  }
}
