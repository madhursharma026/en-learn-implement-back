import { Field, ObjectType } from '@nestjs/graphql';
import { UserModel } from 'src/modules/users/model/user.model';

@ObjectType({ description: 'Represents the conversation model.' })
export class ConversationModel {
  @Field()
  id: 24;

  @Field()
  isWaiting: boolean;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => UserModel, { nullable: true })
  conversationInitiator: UserModel;

  @Field(() => UserModel, { nullable: true })
  conversationWith: UserModel;

  @Field(() => Boolean, { nullable: true })
  isPair: boolean;
}
