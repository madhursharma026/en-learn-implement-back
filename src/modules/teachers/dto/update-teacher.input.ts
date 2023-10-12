import { InputType, PartialType } from '@nestjs/graphql';

import { RegisterTeacherInput } from './register-teacher.input';
@InputType()
export class UpdateTeacherInput extends PartialType(RegisterTeacherInput) {}
