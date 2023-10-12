import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IsString, IsDefined, IsNotEmpty } from 'class-validator';

@InputType()
export class FirstStepLoginInput {
  @Field(() => String, { description: 'mobile number' })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  mobileNumber: string;
}

@InputType()
export class LoginVerificationInput {
  @Field(() => String, { description: 'mobile number' })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  mobileNumber: string;

  @Field(() => String, { description: 'OTP code' })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  otpCode: string;
}

@ObjectType()
export class RegisterResponse {
  @Field(() => Int, { description: 'user id' })
  id: number;
}

@ObjectType()
export class FirstStepLoginResponse {
  @Field(() => String, { description: 'start verification id' })
  id: string;
}

@ObjectType()
export class LoginVerificationResponse {
  @Field(() => String, { description: 'JWT token' })
  jwtToken: string;

  @Field(() => String, { description: 'Refresh token' })
  refreshToken: string;
}
