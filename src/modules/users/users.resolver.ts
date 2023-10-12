import {
  Int,
  Args,
  Parent,
  Query,
  Mutation,
  Resolver,
  ResolveField,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { UserModel } from './model/user.model';
import { UsersService } from './users.service';
import { JWTAuthGuard } from '../auth/guards/auth.guard';
import { User } from '../auth/decorators/user.decorator';
import { UpdateUserInput } from './dto/update-user.input';
import { ICurrentUser } from '../auth/interfaces/current-user.interface';
import { ConversationModel } from '../conversation/models/conversation.model';
import { TeachingClassModel } from '../teaching-class/model/teaching-class.model';

@Resolver(() => UserModel)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JWTAuthGuard)
  @Query(() => [UserModel], { name: 'users' })
  findAll() {
    return this.usersService.findAll({});
  }

  @UseGuards(JWTAuthGuard)
  @Query(() => UserModel, { name: 'user' })
  findOne(@Args('userId', { type: () => Int }) userId: number) {
    return this.usersService.findOneById(userId);
  }

  @UseGuards(JWTAuthGuard)
  @Mutation(() => UserModel, { name: 'updateUser' })
  updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
    @User() user: ICurrentUser,
  ) {
    return this.usersService.updateUser(user.id, updateUserInput);
  }

  @ResolveField('conversationsStarted', () => [ConversationModel])
  getConversationStartedByUser(@Parent() parent: UserModel) {
    return this.usersService.getConversationStartedByUser(parent.id);
  }

  @ResolveField('conversationJoined', () => [ConversationModel])
  getConversationJoinedByUser(@Parent() parent: UserModel) {
    return this.usersService.getConversationJoinedByUser(parent.id);
  }

  @ResolveField('teachingClasses', () => [TeachingClassModel])
  getTeachingClassesOfUser(@Parent() parent: UserModel) {
    return this.usersService.getTeachingClassesOfUser(parent.id);
  }
}
