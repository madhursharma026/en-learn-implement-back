import {
  IsNumber,
  IsString,
  IsDefined,
  IsNotEmpty,
  IsPositive,
} from 'class-validator';
import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class RegisterTeacherInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  firstName: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  lastName: string;

  @Field(() => Int)
  @IsNumber()
  @IsDefined()
  @IsPositive()
  age: number;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  mobileNumber: string;
}
