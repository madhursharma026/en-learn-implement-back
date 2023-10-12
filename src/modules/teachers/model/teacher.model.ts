import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';

import { TeachingClassModel } from '../../teaching-class/model/teaching-class.model';

@ObjectType()
export class TeacherModel {
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

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt: Date;

  @Field(() => [TeachingClassModel])
  teachingClasses: TeachingClassModel[];
}
