import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';

import { UserModel } from '../../users/model/user.model';
import { TeacherModel } from '../../teachers/model/teacher.model';

@ObjectType()
export class TeachingClassModel {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  title: string;

  @Field(() => GraphQLISODateTime)
  startsAt: Date;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => Int)
  teacherId: number;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt: Date;

  @Field(() => [UserModel])
  usersJoined: UserModel[];

  @Field(() => TeacherModel)
  teacher: TeacherModel;
}
