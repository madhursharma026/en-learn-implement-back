import { InputType, Field, GraphQLISODateTime } from '@nestjs/graphql';
import { IsNumber, IsString, IsDefined, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateTeachingClassInput {
  @Field(() => String, { description: 'title', nullable: false })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  title: string;

  @Field(() => GraphQLISODateTime, {
    description: 'class time',
    nullable: false,
  })
  @IsDefined()
  @IsNotEmpty()
  startsAt: Date;

  @Field(() => Number, { description: 'teacher ID ', nullable: false })
  @IsNumber()
  @IsDefined()
  teacherId: number;
}
