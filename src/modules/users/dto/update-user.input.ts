import { RegisterUserInput } from './register-user.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput extends PartialType(RegisterUserInput) {}
