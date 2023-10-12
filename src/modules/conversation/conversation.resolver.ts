import {
  Parent,
  Mutation,
  Resolver,
  ResolveField,
  Subscription,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';

import { UserModel } from '../users/model/user.model';
import { UsersService } from '../users/users.service';
import { JWTAuthGuard } from '../auth/guards/auth.guard';
import { User } from '../auth/decorators/user.decorator';
import { ConversationService } from './conversation.service';
import { Conversation } from './entities/conversation.entity';
import { ConversationModel } from './models/conversation.model';
import { ICurrentUser } from '../auth/interfaces/current-user.interface';

@Resolver(() => ConversationModel)
export class ConversationResolver {
  pubSub: PubSub;
  constructor(
    private readonly conversationService: ConversationService,
    private readonly userService: UsersService,
  ) {
    this.pubSub = new PubSub();
  }

  @UseGuards(JWTAuthGuard)
  @Mutation(() => ConversationModel, { name: 'initiateConversation' })
  async initiateConversation(@User() user: ICurrentUser) {
    const result = await this.conversationService.createOrJoinConversation(
      user,
    );

    if (result.isPair) {
      this.pubSub.publish('pairMatched', {
        pairMatched: result,
      });
    }
    return result;
  }

  @Subscription(() => ConversationModel, { name: 'pairMatched' })
  pairMatched() {
    return this.pubSub.asyncIterator('pairMatched');
  }

  @ResolveField('conversationInitiator', () => UserModel, { nullable: true })
  conversationInitiator(@Parent() parent: Conversation) {
    return this.userService.findOneById(parent.conversationInitiatorId);
  }

  @ResolveField('conversationWith', () => UserModel, { nullable: true })
  conversationWith(@Parent() parent: Conversation) {
    return this.userService.findOneById(parent.conversationWithId);
  }
}
