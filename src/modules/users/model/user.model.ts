import { Int, Field, ObjectType, GraphQLISODateTime } from '@nestjs/graphql';

import { ConversationModel } from 'src/modules/conversation/models/conversation.model';
import { TeachingClassModel } from 'src/modules/teaching-class/model/teaching-class.model';

@ObjectType()
export class UserModel {
  @Field(() => Int)
  id: number;

  @Field(() => String, { nullable: true })
  firstName: string;

  @Field(() => String, { nullable: true })
  lastName: string;

  @Field(() => Int, { nullable: true })
  age: number;

  @Field(() => String)
  mobileNumber: string;

  @Field(() => Boolean)
  verified: boolean;

  @Field(() => Int)
  level: number;

  @Field(() => Int)
  totalTalks: number;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt: Date;

  @Field(() => [TeachingClassModel])
  teachingClasses: TeachingClassModel[];

  @Field(() => [ConversationModel])
  conversationsStarted: ConversationModel[];

  @Field(() => [ConversationModel])
  conversationJoined: ConversationModel[];
}
