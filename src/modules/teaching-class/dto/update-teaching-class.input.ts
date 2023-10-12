import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

import { CreateTeachingClassInput } from './create-teaching-class.input';

@InputType()
export class UpdateTeachingClassInput extends PartialType(
  CreateTeachingClassInput,
) {
  @Field(() => Int)
  id: number;
}
